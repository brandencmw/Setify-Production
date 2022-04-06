import React, { FormEvent } from "react";
import MethodQuestion from "./methodquestion/MethodQuestion";
import PlaylistQuestion from "./playlistquestion/PlaylistQuestion";
import ErrorPopup from "../../ErrorPopup";

interface formProps {
    user: any,
    mergePlaylists: any
}

function PaginatedForm(props: formProps) {

    interface PlaylistType {
        selectID: string,
        playlistID: string
    }

    const [pageNum, setPageNum] = React.useState(1);
    const [formData, setFormData] = React.useState({
        method: '' as string,
        playlists: [] as Array<PlaylistType>,
    });
    const [error, setError] = React.useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        let target = event.target as HTMLFormElement;
        Array.prototype.forEach.call(target.elements, (element: any) => {
             console.log(element.value);
        });
    }

    function handleNext() {
        if(pageNum === 1) {
            setPageNum(pageNum+1);
        }
    }

    function handlePrev() {
        if(pageNum === 2) {
            setPageNum(pageNum-1);
        }
    }

    function updatePlaylists(id: string, newValue: string) {
        setFormData((previousState: any) => {
            let updatedLists = previousState.playlists;

            if(updatedLists.length < 2) {
                updatedLists.push({selectID: id, playlistID: newValue});
            } else {
                let index = updatedLists.findIndex((playlist: PlaylistType) => {
                    return(playlist.selectID === id);
                });
    
                if(index !== -1) {
                    updatedLists.splice(index, 1, {selectID: updatedLists[index].selectID, playlistID: newValue});
                } else {
                    updatedLists.push({selectID: id, playlistID: newValue});
                }
            }

            return({
                ...previousState,
                playlists: updatedLists
            })
        })
    }

    function changeMethod(value: string) {
        setFormData((previousState: any) => {
            return({
                ...previousState,
                method: value
            })
        });
    }

    function deletePlaylist(updateID: string) {
        setFormData((previousState: any) => {
            let updatedLists = previousState.playlists.filter((playlist: PlaylistType) => {
                console.log(`${playlist.selectID}: ${updateID}`)
                return(playlist.selectID !== updateID);
            });
            return({
                ...previousState,
                playlists: updatedLists
            });
        })
    }

    function onChange(event: FormDataEvent) {
        let target = event.target as any;
        if(target.id?.startsWith('buttonImg')) {
            deletePlaylist(target.id.substring(9))
        } else {
            let value = target.value;
            if(target.type === 'radio') {
                changeMethod(value)
            } else {
                updatePlaylists(target.name, value);
            }
        }
    }

    function validForm(formData: any) {
        return formData.method !== '' && formData.playlists.length > 1;
    }

    function onMerge() {
        console.log('submitted');
        if(validForm(formData)) {
            props.mergePlaylists(formData);
        } else {
            console.log("NOT");
            setError(true);
        }

    }

    function renderPage() {
        if(pageNum === 1) {
            return(<MethodQuestion onNext={handleNext} onChange={onChange} formData={formData} />);            
        } else if(pageNum === 2) {
            return(<PlaylistQuestion user={props.user} onMerge={onMerge} onPrev={handlePrev} onChange={onChange} formData={formData}/>);

        }
    }

    function closeError() {
        setError(false);
    }

    return(
        <div>
            <ErrorPopup open={error} onClose={closeError} text='There was a problem submitting the form, please check your inputs'/>
            <form className="container" onSubmit={handleSubmit} id='mergeForm'>
                {renderPage()}
                <button style={{display: 'none'}} type="submit" id="submitButton"></button>
            </form>
        </div>
    );
}

export default PaginatedForm;
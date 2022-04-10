import React from "react";
import MethodQuestion from "./methodquestion/MethodQuestion";
import PlaylistQuestion from "./playlistquestion/PlaylistQuestion";
import ErrorPopup from "../../ErrorPopup";
function PaginatedForm(props) {
    const [pageNum, setPageNum] = React.useState(1);
    const [formData, setFormData] = React.useState({
        method: '',
        playlists: [],
    });
    const [error, setError] = React.useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        let target = event.target;
        Array.prototype.forEach.call(target.elements, (element) => {
            console.log(element.value);
        });
    }
    function handleNext() {
        if (pageNum === 1) {
            setPageNum(pageNum + 1);
        }
    }
    function handlePrev() {
        if (pageNum === 2) {
            setPageNum(pageNum - 1);
        }
    }
    function updatePlaylists(id, newValue) {
        setFormData((previousState) => {
            let updatedLists = previousState.playlists;
            if (updatedLists.length < 2) {
                updatedLists.push({ selectID: id, playlistID: newValue });
            }
            else {
                let index = updatedLists.findIndex((playlist) => {
                    return (playlist.selectID === id);
                });
                if (index !== -1) {
                    updatedLists.splice(index, 1, { selectID: updatedLists[index].selectID, playlistID: newValue });
                }
                else {
                    updatedLists.push({ selectID: id, playlistID: newValue });
                }
            }
            return (Object.assign(Object.assign({}, previousState), { playlists: updatedLists }));
        });
    }
    function changeMethod(value) {
        setFormData((previousState) => {
            return (Object.assign(Object.assign({}, previousState), { method: value }));
        });
    }
    function deletePlaylist(updateID) {
        setFormData((previousState) => {
            let updatedLists = previousState.playlists.filter((playlist) => {
                console.log(`${playlist.selectID}: ${updateID}`);
                return (playlist.selectID !== updateID);
            });
            return (Object.assign(Object.assign({}, previousState), { playlists: updatedLists }));
        });
    }
    function onChange(event) {
        var _a;
        let target = event.target;
        if ((_a = target.id) === null || _a === void 0 ? void 0 : _a.startsWith('buttonImg')) {
            deletePlaylist(target.id.substring(9));
        }
        else {
            let value = target.value;
            if (target.type === 'radio') {
                changeMethod(value);
            }
            else {
                updatePlaylists(target.name, value);
            }
        }
    }
    function validForm(formData) {
        return formData.method !== '' && formData.playlists.length > 1;
    }
    function onMerge() {
        console.log('submitted');
        if (validForm(formData)) {
            props.mergePlaylists(formData);
        }
        else {
            console.log("NOT");
            setError(true);
        }
    }
    function renderPage() {
        if (pageNum === 1) {
            return (<MethodQuestion onNext={handleNext} onChange={onChange} formData={formData}/>);
        }
        else if (pageNum === 2) {
            return (<PlaylistQuestion user={props.user} onMerge={onMerge} onPrev={handlePrev} onChange={onChange} formData={formData}/>);
        }
    }
    function closeError() {
        setError(false);
    }
    return (<div>
            <ErrorPopup open={error} onClose={closeError} text='There was a problem submitting the form, please check your inputs'/>
            <form className="container" onSubmit={handleSubmit} id='mergeForm'>
                {renderPage()}
                <button style={{ display: 'none' }} type="submit" id="submitButton"></button>
            </form>
        </div>);
}
export default PaginatedForm;

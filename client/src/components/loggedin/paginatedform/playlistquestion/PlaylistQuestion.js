import React from "react";
import FormButton from "../FormButton";
import PlusIcon from "../../../../assets/images/PlusIcon.svg";
import LeftArrow from "../../../../assets/images/LeftArrow.svg";
import RightArrow from "../../../../assets/images/RightArrow.svg";
import PlaylistDropdown from "./PlaylistDropdown";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
function PlaylistQuestion(props) {
    const [playlists, setPlaylists] = React.useState([]);
    const [selectedLists, setSelected] = React.useState([]);
    function addDropdown() {
        if (selectedLists.length < 5) {
            setSelected((previousList) => {
                let id = uuid4();
                return [
                    ...previousList,
                    <PlaylistDropdown playlists={playlists} selectID={id} key={id} value="" onRemove={removeDropdown} onChange={props.onChange}/>,
                ];
            });
        }
    }
    function addExistingDropdowns(dropdowns) {
        setSelected((previousList) => {
            return [...dropdowns];
        });
    }
    function removeDropdown(e) {
        var _a;
        const target = e.target;
        console.log(selectedLists.length);
        if (target && selectedLists.length > 2) {
            let id = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id.slice(6);
            if (id != null) {
                setSelected((previousList) => {
                    let newList = previousList.filter((list) => {
                        return list.props.selectID !== id;
                    });
                    return newList;
                });
                props.onChange(e);
            }
        }
    }
    React.useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:5000/get-playlists",
            // url: 'http://localhost:5000/get-playlists',
            headers: {
                User: props.user.userID,
            },
        })
            .then((returnedLists) => {
            setPlaylists(returnedLists.data.playlists);
        })
            .catch((err) => {
            console.log(err);
        });
    }, []);
    if (playlists.length > 0 && selectedLists.length === 0) {
        let initialDropdowns = [];
        props.formData.playlists.forEach((playlist) => {
            initialDropdowns.push(<PlaylistDropdown playlists={playlists} selectID={playlist.selectID} key={playlist.selectID} value={playlist.playlistID} onRemove={removeDropdown} onChange={props.onChange}/>);
        });
        for (let i = 0; i < 2 - props.formData.playlists.length; i++) {
            let id = uuid4();
            initialDropdowns.push(<PlaylistDropdown playlists={playlists} selectID={id} key={id} value="" onRemove={removeDropdown} onChange={props.onChange}/>);
        }
        addExistingDropdowns(initialDropdowns);
    }
    function renderAdd() {
        if (selectedLists.length < 5) {
            return (<FormButton text="" iconLoc="left" icon={PlusIcon} onClick={addDropdown} buttonID={null}/>);
        }
    }
    return (<div className="playlist-question">
      <h2 className="form-prompt">
        Select your playlists
        <br />
        You can add up to five
      </h2>
      {selectedLists.map((list, i) => {
            if (list != null) {
                return list;
            }
        })}
      <div className="button-panel">
        <FormButton text="Previous" iconLoc="left" icon={LeftArrow} onClick={props.onPrev} buttonID={null}/>
        {renderAdd()}
        <FormButton text="Merge" iconLoc="right" icon={RightArrow} onClick={props.onMerge} buttonID={null}/>
      </div>
    </div>);
}
export default PlaylistQuestion;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormButton_1 = __importDefault(require("../FormButton"));
const PlusIcon_svg_1 = __importDefault(require("../../../../assets/images/PlusIcon.svg"));
const LeftArrow_svg_1 = __importDefault(require("../../../../assets/images/LeftArrow.svg"));
const RightArrow_svg_1 = __importDefault(require("../../../../assets/images/RightArrow.svg"));
const PlaylistDropdown_1 = __importDefault(require("./PlaylistDropdown"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
function PlaylistQuestion(props) {
    const [playlists, setPlaylists] = react_1.default.useState([]);
    const [selectedLists, setSelected] = react_1.default.useState([]);
    function addDropdown() {
        if (selectedLists.length < 5) {
            setSelected((previousList) => {
                let id = (0, uuid_1.v4)();
                return [
                    ...previousList,
                    <PlaylistDropdown_1.default playlists={playlists} selectID={id} key={id} value="" onRemove={removeDropdown} onChange={props.onChange}/>,
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
    react_1.default.useEffect(() => {
        (0, axios_1.default)({
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
            initialDropdowns.push(<PlaylistDropdown_1.default playlists={playlists} selectID={playlist.selectID} key={playlist.selectID} value={playlist.playlistID} onRemove={removeDropdown} onChange={props.onChange}/>);
        });
        for (let i = 0; i < 2 - props.formData.playlists.length; i++) {
            let id = (0, uuid_1.v4)();
            initialDropdowns.push(<PlaylistDropdown_1.default playlists={playlists} selectID={id} key={id} value="" onRemove={removeDropdown} onChange={props.onChange}/>);
        }
        addExistingDropdowns(initialDropdowns);
    }
    function renderAdd() {
        if (selectedLists.length < 5) {
            return (<FormButton_1.default text="" iconLoc="left" icon={PlusIcon_svg_1.default} onClick={addDropdown} buttonID={null}/>);
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
        <FormButton_1.default text="Previous" iconLoc="left" icon={LeftArrow_svg_1.default} onClick={props.onPrev} buttonID={null}/>
        {renderAdd()}
        <FormButton_1.default text="Merge" iconLoc="right" icon={RightArrow_svg_1.default} onClick={props.onMerge} buttonID={null}/>
      </div>
    </div>);
}
exports.default = PlaylistQuestion;

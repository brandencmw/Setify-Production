import React from "react";
import FormButton from "../FormButton";
import PlusIcon from "../../../../assets/images/PlusIcon.svg";
import LeftArrow from "../../../../assets/images/LeftArrow.svg";
import RightArrow from "../../../../assets/images/RightArrow.svg";
import PlaylistDropdown from "./PlaylistDropdown";
import axios from "axios";
import { v4 as uuid4 } from "uuid";

interface playlistQProps {
  user: any;
  onMerge: any;
  onPrev: any;
  onChange: any;
  formData: any;
}

function PlaylistQuestion(props: playlistQProps) {
  const [playlists, setPlaylists] = React.useState<Array<any>>([]);
  const [selectedLists, setSelected] = React.useState<Array<any>>([]);

  function addDropdown() {
    if (selectedLists.length < 5) {
      setSelected((previousList: any) => {
        let id = uuid4();
        return [
          ...previousList,
          <PlaylistDropdown
            playlists={playlists}
            selectID={id}
            key={id}
            value=""
            onRemove={removeDropdown}
            onChange={props.onChange}
          />,
        ];
      });
    }
  }

  function addExistingDropdowns(dropdowns: Array<any>) {
    setSelected((previousList: any) => {
      return [...dropdowns];
    });
  }

  function removeDropdown(e: MouseEvent) {
    const target = e.target as HTMLImageElement;
    console.log(selectedLists.length);
    if (target && selectedLists.length > 2) {
      let id = target.parentElement?.id.slice(6);
      if (id != null) {
        setSelected((previousList: any) => {
          let newList = previousList.filter((list: any) => {
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
      url: "https://setify-merger.herokuapp.com/get-playlists",
      // url: 'http://localhost:5000/get-playlists',
      headers: {
        User: props.user.userID,
      },
    })
      .then((returnedLists: any) => {
        setPlaylists(returnedLists.data.playlists);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  if (playlists.length > 0 && selectedLists.length === 0) {
    let initialDropdowns = [] as Array<any>;
    props.formData.playlists.forEach((playlist: any) => {
      initialDropdowns.push(
        <PlaylistDropdown
          playlists={playlists}
          selectID={playlist.selectID}
          key={playlist.selectID}
          value={playlist.playlistID}
          onRemove={removeDropdown}
          onChange={props.onChange}
        />
      );
    });
    for (let i = 0; i < 2 - props.formData.playlists.length; i++) {
      let id = uuid4();
      initialDropdowns.push(
        <PlaylistDropdown
          playlists={playlists}
          selectID={id}
          key={id}
          value=""
          onRemove={removeDropdown}
          onChange={props.onChange}
        />
      );
    }
    addExistingDropdowns(initialDropdowns);
  }

  function renderAdd() {
    if (selectedLists.length < 5) {
      return (
        <FormButton
          text=""
          iconLoc="left"
          icon={PlusIcon}
          onClick={addDropdown}
          buttonID={null}
        />
      );
    }
  }

  return (
    <div className="playlist-question">
      <h2 className="form-prompt">
        Select your playlists
        <br />
        You can add up to five
      </h2>
      {selectedLists.map((list: any, i: number) => {
        if (list != null) {
          return list;
        }
      })}
      <div className="button-panel">
        <FormButton
          text="Previous"
          iconLoc="left"
          icon={LeftArrow}
          onClick={props.onPrev}
          buttonID={null}
        />
        {renderAdd()}
        <FormButton
          text="Merge"
          iconLoc="right"
          icon={RightArrow}
          onClick={props.onMerge}
          buttonID={null}
        />
      </div>
    </div>
  );
}

export default PlaylistQuestion;

const uuid = require("uuid"); //Used to generate new playlist title
// Dependecies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Spotify API config
const SpotifyWebAPI = require("spotify-web-api-node");
const redirectURI = "http://localhost:5000/callback";
const spotifyCredentials = {
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: redirectURI,
};
const spotifyAPI = new SpotifyWebAPI(spotifyCredentials);
console.log(spotifyAPI);

app.use(express.static(__dirname + "/src/public"));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Type definitions
//Important data about new playlist to be passed to frontend
interface NewListType {
  id: string;
  name: string;
  url: string;
}

// Contains all important data about tracks for backend and frontend puposes
interface TrackType {
  uri: string;
  name: string;
  imageURL: string;
  artistName: string;
}

app.get("/login", (req: any, res: any) => {
  const scopes = [
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
    "playlist-modify-public",
    "user-read-email",
    "user-read-private",
  ];
  res.redirect(
    spotifyAPI.createAuthorizeURL(scopes /*, state*/) + "&show_dialog=true"
  ); //Redirects user to spotify login to provide specified permissions
});

// Spotify authenticate route reroutes to this callback on completion
app.get("/callback", (req: any, res: any) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error("Callback error: " + error);
    res.send("Callback error: " + error);
    return;
  }

  //Grants authorization based on code handed back from authentication
  //We trade the code for an access and refresh token to make API calls
  spotifyAPI
    .authorizationCodeGrant(code)
    .then((data: any) => {
      const expires_in = data.body["expires_in"];
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      spotifyAPI.setAccessToken(access_token);
      spotifyAPI.setRefreshToken(refresh_token);

      //Refreshes the access token halfway through its allotted duration
      //so that the user always has a valid token
      setInterval(async () => {
        const data = await spotifyAPI.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyAPI.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
      res.redirect(
        `http://localhost:3000/?token=${data.body["access_token"]}&refresh_token=${data.body["refresh_token"]}`
      );
    })
    .catch((err: any) => {
      console.error("Error getting Tokens:", err);
      res.send(`Error getting Tokens: ${err}`);
    });
});

function processUserData(data: any) {
  return {
    displayName: data.body.display_name,
    userID: data.body.id,
  };
}

app.get("/get-userdata", (req: any, res: any) => {
  spotifyAPI.setAccessToken(req.headers["authorization"]);
  console.log(spotifyAPI.getAccessToken());
  spotifyAPI
    .getMe()
    .then((data: any) => {
      res.send(processUserData(data));
    })
    .catch((err: any) => {
      res.send("user data error: " + err);
      console.log(err);
    });
});

function processPlaylistData(data: any) {
  const playlists: Array<any> = [];
  let imgSrc: string | null;
  data.forEach((playlist: any) => {
    console.log(playlist);
    imgSrc = playlist.images ? playlist.images[0]?.url : null;

    playlists.push({
      id: playlist.id,
      imgSrc: imgSrc,
      name: playlist.name,
    });
  });

  return playlists;
}

app.get("/get-playlists", (req: any, res: any) => {
  spotifyAPI
    .getUserPlaylists(req.headers["user"])
    .then((data: any) => {
      const playlists = processPlaylistData(data.body.items);
      res.send({
        playlists: playlists,
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
});

function appendLists(lists: Array<Array<TrackType>>) {
  let combinedLists = [] as Array<any>;
  for (let i = 0; i < lists.length; i++) {
    combinedLists.push(...lists[i]);
  }
  return combinedLists;
}

function intersectLists(lists: Array<Array<TrackType>>) {
  let maxSet = lists[0] as Array<TrackType>;
  let result = [] as Array<TrackType>;
  console.log(result);
  for (let i = 0; i < maxSet.length; i++) {
    let add = true as boolean;
    for (let j = 1; j < lists.length; j++) {
      if (!lists[j].some((track: any) => track.uri === maxSet[i].uri)) {
        add = false;
        break;
      }
      if (add) {
        result.push(maxSet[i]);
      }
    }
  }
  return result;
}

function unionLists(lists: Array<Array<TrackType>>) {
  let result = lists[0] as Array<TrackType>;
  for (let i = 1; i < lists.length; i++) {
    for (let j = 0; j < lists[i].length; j++) {
      if (!result.includes(lists[i][j])) {
        result.push(lists[i][j]);
      }
    }
  }
  return result;
}

function interleaveLists(lists: Array<Array<TrackType>>) {
  const listLens = lists.map((list: any) => list.length);
  const longestListLen = Math.max(...listLens);
  let result = [] as Array<TrackType>;
  for (let i = 0; i < longestListLen; i++) {
    for (let j = 0; j < lists.length; j++) {
      if (i < lists[j].length && !result.includes(lists[j][i])) {
        result.push(lists[j][i]);
      }
    }
  }
  return result;
}

function getTrackList(playlistID: string) {
  return spotifyAPI
    .getPlaylistTracks(playlistID, {
      offset: 0,
      limit: 100,
      fields: "items",
    })
    .then((data: any) => {
      return data.body.items;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

async function requestTracks(playlists: Array<any>) {
  let allTracks = [] as Array<any>;
  for (let i = 0; i < playlists.length; i++) {
    let trackData = await getTrackList(playlists[i].playlistID);
    allTracks[i] = trackData.map((track: any) => track.track);
  }
  return allTracks;
}

function extractTrackInfo(
  playlists: Array<Array<any>>
): Array<Array<TrackType>> {
  let trackInfo = [] as Array<Array<TrackType>>;
  for (let i = 0; i < playlists.length; i++) {
    let row = [];
    for (let j = 0; j < playlists[i].length; j++) {
      row.push({
        uri: playlists[i][j].uri,
        name: playlists[i][j].name,
        imageURL: playlists[i][j].album.images[0].url,
        artistName: playlists[i][j].artists[0].name,
      });
    }
    trackInfo.push(row);
  }
  return trackInfo;
}

function createPlaylist() {
  let newPlaylist = spotifyAPI
    .createPlaylist(`New merged playlist ${uuid.v4().substring(0, 10)}`, {
      description: "Thank you for using Setify, we appreciate your support.",
      public: true,
    })
    .then((data: any) => {
      console.log(data);
      return {
        id: data.body.id,
        name: data.body.name,
        url: data.body.href,
      } as NewListType;
    })
    .catch((err: any) => {
      console.log(err);
      return { id: err, name: "err" } as NewListType;
    });
  return newPlaylist;
}

function insertTracks(playlistID: string, tracks: Array<TrackType>) {
  let result = true as boolean;
  for (let i = 0; i < Math.ceil(tracks.length / 100); i++) {
    let endSlice;
    if (i + 1 * 100 >= tracks.length) {
      endSlice = (i * 100 + (tracks.length % ((i + 1) * 100))) as number;
    } else {
      endSlice = ((i + 1) * 100) as number;
    }
    let uris = tracks.slice(i * 100, endSlice).map((track: TrackType) => {
      return track.uri;
    });
    result = spotifyAPI
      .addTracksToPlaylist(playlistID, uris)
      .then((data: any) => {
        return true;
      })
      .catch((err: any) => {
        return false;
      });
  }
  return result;
}

function combineLists(method: string, tracks: Array<Array<TrackType>>) {
  let combinedLists = [] as Array<TrackType>;
  switch (method) {
    case "append":
      combinedLists = appendLists(tracks);
      break;
    case "intersection":
      combinedLists = intersectLists(tracks);
      break;
    case "union":
      combinedLists = unionLists(tracks);
      break;
    case "interleaved":
      combinedLists = interleaveLists(tracks);
      break;
    default:
      break;
  }
  return combinedLists;
}

app.get("/merge-playlists", (req: any, res: any) => {
  console.log("Successful request");
  const data = JSON.parse(req.query.data);
  requestTracks(data["playlists"]).then((tracks: any) => {
    const trackInfo = extractTrackInfo(tracks) as Array<Array<TrackType>>;
    const combinedLists = combineLists(
      data["method"],
      trackInfo
    ) as Array<TrackType>;
    createPlaylist()
      .then((newPlaylist: NewListType) => {
        if (newPlaylist.name === "err") {
          console.log(newPlaylist.id);
        } else {
          let success = insertTracks(newPlaylist.id, combinedLists) as boolean;
          res.send({
            newList: newPlaylist,
            tracks: combinedLists,
            success: success,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
});

app.get("/logout", (req: any, res: any) => {
  console.log("WE GOT TO THE LOGOUT PLACE");
  spotifyAPI.setAccessToken(null);
  spotifyAPI.setRefreshToken(null);
  res.redirect("http://localhost:3000");
});

app.listen(process.env.PORT || 5000, (req: any, res: any) => {
  console.log("Server started on port 5000");
});

import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Views/Login/Login";
import moduleName from "module";
import { getTokenFromUrl } from "./config/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Views/Dashboard/Player/Player";
import { useStateValue } from "./stateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({ type: "SET_USER", user: user });
      });
    }
    console.log("I have a token", token);
  }, []);

  console.log("user", user);

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;

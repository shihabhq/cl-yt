import { useEffect, useState } from "react";
import getPlayList from "../api/api";
import storage from "../utils/storage";

const STORAGE_KEY = "cy_playlist_state";

const Init_list = {
  playLists: {},
  recentPlayLists: [],
  favorites: [],
};

const usePlayList = () => {
  const [state, setState] = useState(Init_list);

  useEffect(() => {
    const state = storage.get(STORAGE_KEY);
    if (state) {
      setState({ ...state });
    }
  }, []);
  useEffect(() => {
    if (state !== Init_list) {
      storage.save(STORAGE_KEY, state);
    }
  }, [state]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getVideoPlayListById = async (playlistId, refresh = false) => {
    if (state.playLists[playlistId] && !refresh) {
      return;
    }
    setLoading(true);

    try {
      const playList = await getPlayList(playlistId);
      setState((prev) => ({
        ...prev,
        playLists: {
          ...prev.playLists,
          [playlistId]: playList,
        },
      }));
      setError("");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "something went wrong";
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addToFavourites = (playlistId) => {
    setState((prev) => ({
      ...prev,
      favorites: [...prev.favorites, playlistId],
    }));
  };
  const addToRecent = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentPlayLists: [...prev.recentPlayLists, playlistId],
    }));
  };

  const getPlaylistsByIds = (ids = []) => {
    ids.map((id) => {
      return state.playLists[id];
    });
  };

  return {
    playLists: state.playLists,
    recentPlayLists: getPlaylistsByIds(state.recentPlayLists),
    favoritePlayLists: getPlaylistsByIds(state.favorites),
    getVideoPlayListById,
    addToFavourites,
    error,
    loading,
    addToRecent,
  };
};

export default usePlayList;

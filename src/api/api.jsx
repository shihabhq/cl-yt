import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;
const getPlayListItem = async (playlistId, pageToken, result = []) => {
  const Url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&maxResults=100&part=id,contentDetails,snippet${
    pageToken ? `&pageToken=${pageToken}` : ``
  }`;

  const { data } = await axios.get(Url);
  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = getPlayListItem(playlistId, data.nextPageToken, result);
  }
  return result;
};

const getPlayList = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?id=${playlistId}&part=snippet&key=${key}`;
  const { data } = await axios.get(URL);

  const {
    title: playListTitle,
    description: playListDescription,
    channelId,
    channelTitle,
    thumbnails,
  } = data?.items[0]?.snippet || {};

  let playListItems = await getPlayListItem(playlistId);

  playListItems = playListItems.map((item) => {
    const {
      title,
      description,
      thumbnails: { medium },
    } = item.snippet;

    return {
      title,
      description,
      thumbnail: medium,
      contentDetails: item.contentDetails,
    };
  });

  return {
    playListTitle,
    playListDescription,
    channelId,
    channelTitle,
    playListThumbnail: thumbnails.default,
    playListItems,
    playlistId,
  };
};

export default getPlayList;

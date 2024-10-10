import { useEffect, useState } from "react";
import usePlayList from "./hook/usePlaylist";
import Grid from "@mui/material/Grid2";
import { Container, CssBaseline, CircularProgress, Box } from "@mui/material";
import Navbar from "./components/navbar/navbar";
import PlayListCard from "./components/playlistCardItem/card";

const App = () => {
  const {
    addToFavourites,
    addToRecent,
    favoritePlayLists,
    getVideoPlayListById,
    playLists,
    recentPlayLists,
    loading,
  } = usePlayList();

  //   getVideoPlayListById(" PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl PL_XxuZqN0xVAWGDKIzcn6NWikVkljJQZc PL_XxuZqN0xVBIBzSmibJ2pKDGu3dO5QjE");

  const playListArray = Object.values(playLists);

  return (
    <>
      <CssBaseline />
      <Navbar getVideoPlayListById={getVideoPlayListById} />

      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display:'flex',
            zIndex:'99',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        ""
      )}
      {playListArray.length > 0 && (
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Grid container spacing={6} alignItems={'stretch'}>
            {playListArray.map((playlist) => {
              const {
                playListTitle,
                playListDescription,
                channelId,
                channelTitle,
                playListThumbnail,
                playListItems,
                playlistId,
              } = playlist;
              return (
                <PlayListCard
                  key={playlistId}
                  playListThumbnail={playListThumbnail}
                  channelTitle={channelTitle}
                  playListDescription={playListDescription}
                  playListTitle={playListTitle}
                />
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default App;

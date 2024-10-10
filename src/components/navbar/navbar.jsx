import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import PlayListForm from "../playlistForm/playlistForm";

const Navbar = ({ getVideoPlayListById }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const getPlayListId = (playlistId) => {
    getVideoPlayListById(playlistId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" sx={{ py: 2 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <Typography variant="h4">Clean youtube</Typography>
              <Typography variant="body1">By Shihab</Typography>
            </Stack>
            <Button
              color="info"
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Add PlayList
            </Button>
            <PlayListForm
              open={openModal}
              handleClose={handleClose}
              getPlayListId={getPlayListId}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;

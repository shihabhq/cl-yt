import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid2 } from "@mui/material";

const PlayListForm = ({ open, handleClose, getPlayListId }) => {
  const [formId, setFormId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formId) {
      alert("Invalid Form Id given");
    } else {
      getPlayListId(formId);
      setFormId("");
      handleClose();
    }
  };

  return (
    <Grid2 size={4}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please insert the youtube playlist id or link. make sure the id or
            link is valid.
          </DialogContentText>
          <TextField
            autoFocus
            required
            onChange={(e) => setFormId(e.target.value)}
            value={formId}
            margin="dense"
            id="name"
            name="email"
            label="Playlist link"
            fullWidth
            variant="filled"
            placeholder="Playlist link or id"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};
export default PlayListForm;

import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Grid2 } from "@mui/material";

const PlayListCard = ({
  playListThumbnail,
  playListTitle,
  playListDescription,
  channelTitle,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_LENGTH = 100; // limit for the description preview

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Grid2 size={4}>
      <Card sx={{ maxWidth: 345, display: "flex", height:'100%', flexDirection: "column" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={playListThumbnail.url}
          title={playListTitle}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {" "}
          {/* Ensures that content takes up available space */}
          <Typography gutterBottom variant="h6" component="div">
            {playListTitle}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {channelTitle}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {`${playListDescription.slice(0, MAX_LENGTH)}...`}
            <Button size="small" onClick={toggleDescription}>
              {showFullDescription ? "Read Less" : "Read More"}
            </Button>
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: "auto" }}>
          <Button size="medium">Share</Button>
          <Button
            size="medium"
            variant="contained"
            startIcon={<PlayArrowIcon />}
          >
            Start Course
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default PlayListCard;

import React, { useContext, useState } from "react";
import axios from "axios";
import { withStyles, TextField, Typography, Button } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import AppContext from "../../context";

const CreatePin = ({ classes }) => {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleImgUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geopins");
    data.append("cloud_name", "ahmedscloud");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ahmedscloud/image/upload",
      data
    );

    return res.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = await handleImgUpload();

    console.log("Submitted items => ", { title, content, image, url });
  };
  const handleDeleteDraft = (event) => {
    setContent("");
    setTitle("");
    setImage("");
    dispatch({ type: "DELETE_DRAFT" });
  };
  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        varient="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} />
        Pin Location
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          placeholder="insert pin title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image ? "green" : "black" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Content"
          multiline
          rows="6"
          margin="normal"
          variant="outlined"
          placeholder="Describe the location here"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={handleDeleteDraft}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={!title.trim() || !content.trim() || !image}
          onClick={handleSubmit}
        >
          submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = (theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit,
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%",
  },
  input: {
    display: "none",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  },
});

export default withStyles(styles)(CreatePin);

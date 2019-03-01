import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import photo from "./media/profilePicture.jpg"; // Tell Webpack this JS file uses this image

const styles = theme => ({
  root: {
    marginTop: -16,
    marginLeft: -16,
    marginRight: -16,
    textAlign: "center"
  },
  data: {
    marginLeft: 30,
    marginRight: 30
  },
  header: {
    padding: 26,
    marginBottom: 16,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between"
  },
  text: {
    color: theme.palette.secondary[ "600" ],
    marginBottom: 10
  },
  headerText: {
    color: theme.palette.primary.contrastText
  },
  headerTextDiv: {
    marginLeft: -100,
    marginTop: 4,
    marginBottom: -8,
    flexGrow: 1,
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between"
  },
  summaryText: {
    textAlign: "left"
  },
  h3: {
    fontWeight: 500
  }
});

const HeadSection = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img
          className={classes.image}
          src={photo}
          alt="Rob Sheely"
          title="Rob Sheely"
          height="100"
        />
        <div className={classes.headerTextDiv}>
          <Typography variant="h3" classes={{
            root: classes.headerText,
            h3: classes.h3
          }}>
            {props.name}
          </Typography>
          <Typography variant="body1" className={classes.headerText}>
            {props.contact}
          </Typography>
        </div>
      </div>
      <div className={classes.data}>
        <Typography variant="h5" className={classes.text}>
          {props.head}
        </Typography>
        <Typography variant="h6" className={classes.text}>
          {props.subhead}
        </Typography>
        <Typography variant="body2" className={classes.summaryText}>
          {props.summary}
        </Typography>
      </div>
    </div>
  );
};

HeadSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeadSection);

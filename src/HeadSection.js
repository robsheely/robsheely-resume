import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import photo from "./media/profilePicture.jpg";

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
  const { classes, name, contact, head, subhead, summary } = props;

  return (
    <div
      id="header-section"
      data-testid="header-section"
      className={classes.root}
    >
      <div className={classes.header}>
        <img
          id="header-section-image"
          data-testid="header-section-image"
          className={classes.image}
          src={photo}
          alt="Rob Sheely"
          title="Rob Sheely"
          height="100"
        />
        <div className={classes.headerTextDiv}>
          <Typography
            id="header-section-name"
            data-testid="header-section-name"
            variant="h3"
            classes={{
              root: classes.headerText,
              h3: classes.h3
            }}>
            {name}
          </Typography>
          <Typography
            id="header-section-contact"
            data-testid="header-section-contact"
            variant="body1"
            className={classes.headerText}>
            {contact}
          </Typography>
        </div>
      </div>
      <div className={classes.data}>
        <Typography
          id="header-section-head"
          data-testid="header-section-head"
          variant="h5"
          className={classes.text}>
          {head}
        </Typography>
        <Typography
          id="header-section-subhead"
          data-testid="header-section-subhead"
          variant="h6"
          className={classes.text}>
          {subhead}
        </Typography>
        <Typography
          id="header-section-summary"
          data-testid="header-section-summary"
          variant="body2"
          className={classes.summaryText}>
          {summary}
        </Typography>
      </div>
    </div>
  );
};

HeadSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  subhead: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired
};

export default withStyles(styles)(HeadSection);

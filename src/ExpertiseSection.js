import React from "react";
import PropTypes from "prop-types";

import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  gridList: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bullet: {
    textAlign: "left",
    fontSize: 16
  }
});

const ExpertiseSection = props => {
  const { classes, content } = props;

  return (
    <GridList cellHeight={24} className={classes.gridList} cols={3}>
      {content.map(element => (
        <Typography className={classes.bullet} key={element.id}>•&nbsp;&nbsp;&nbsp;{element.content}</Typography>
      ))}
    </GridList>
  );
};

ExpertiseSection.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired
};

export default withStyles(styles)(ExpertiseSection);

import React from "react";
import GridList from "@material-ui/core/GridList";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  gridList: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14
  },
  bullet: {
    textAlign: "left"
  }
});

const Expertise = props => {
  const { classes, content } = props;
  return (
    <GridList cellHeight={24} className={classes.gridList} cols={3}>
      {content.map(element => (
        <span className={classes.bullet} key={element.id}>• {element.content}</span>
      ))}
    </GridList>
  );
};

export default withStyles(styles)(Expertise);

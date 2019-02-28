import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px"
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0
  },
});

const SectionList = props => {
  const { classes, items } = props;

  return (
    <List dense={false}>
      {items.map(item => (
        <ListItem className={classes.item} key={item.id}>
          <span className={classes.bullet}>•</span>
          <ListItemText primary={item.content}/>
        </ListItem>
      ))
      }
    </List>
  );
};

export default withStyles(styles)(SectionList);

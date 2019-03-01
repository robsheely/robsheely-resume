import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.85)"
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

const SectionList = props => {
  const { classes, name, items } = props;

  return (
    <List id={`sectionList-${name}`} data-testid={`sectionList-${name}`}>
      {items.map(item => (
        <ListItem
          id={`sectionList-${name}-item-${item.id}`}
          data-testid={`sectionList-${name}-item-${item.id}`}
          className={classes.item}
          key={item.id}
        >
          <span className={classes.bullet}>•</span>
          <ListItemText primary={item.content} />
        </ListItem>
      ))
      }
    </List>
  );
};

SectionList.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string.isRequired
  }))
};

export default withStyles(styles)(SectionList);

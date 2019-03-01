import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 6,
    marginBottom: 6,
    paddingLeft: 20,
    paddingRight: 20
  },
  content: {
    textAlign: "left"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
  },
  item: {
    paddingTop: 0,
    paddingBottom: 8
  },
  title: {
    fontSize: 16,
    display: "flex",
    justifyContent: "space-between"
  },
});

const PositionCard = props => {
  const { classes, position } = props;
  const { role, start, end, company, achievements } = position;
  
  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.content }}>
        <Typography className={classes.title}>
          <span>{role.toUpperCase()}</span>
          <span>{`${start} - ${end}`}</span>
        </Typography>
        <Typography className={classes.title}>
          {company}
        </Typography>
        <List dense={false}>
          {achievements.map(achievement => (
            <ListItem className={classes.item} key={achievement.id}>
              <span className={classes.bullet}>•</span>
              <ListItemText primary={achievement.content} />
            </ListItem>
          ))
          }
        </List>
      </CardContent>
    </Card>
  );
};

PositionCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PositionCard);

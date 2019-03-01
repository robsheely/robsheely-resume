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
    margin: "0 2px"
  },
  item: {
    paddingTop: 0,
    paddingBottom: 8
  },
  title: {
    fontSize: 16,
    display: "flex",
    justifyContent: "space-between"
  }
});

const PositionCard = props => {
  const { classes, position } = props;
  const { role, start, end, company, achievements } = position;
  const companyId = company.replace(/\s+/g, "-").toLowerCase();

  return (
    <Card
      id={`position-${companyId}`}
      data-testid={`position-${companyId}`}
      className={classes.root}
    >
      <CardContent classes={{ root: classes.content }}>
        <Typography
          id={`position-${companyId}-title`}
          data-testid={`position-${companyId}-title`}
          className={classes.title}
        >
          <span>{role.toUpperCase()}</span>
          <span>{`${start} - ${end}`}</span>
        </Typography>
        <Typography
          id={`position-${companyId}-company`}
          data-testid={`position-${companyId}-company`}
          className={classes.title}
        >
          {company}
        </Typography>
        <List
          id={`position-${companyId}-achievements`}
          data-testid={`position-${companyId}-achievements`}
          dense={false}
        >
          {achievements.map(achievement => (
            <ListItem
              id={`position-${companyId}-achievement-${achievement.id}`}
              data-testid={`position-${companyId}-achievement-${achievement.id}`}
              className={classes.item}
              key={achievement.id}
            >
              <span className={classes.bullet}>•</span>
              <ListItemText primary={achievement.content}/>
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

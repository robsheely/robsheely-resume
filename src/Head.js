import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  card: {
    marginLeft: 10,
    marginRight: 10
  },
  content: {
    textAlign: "center"
  },
  summary: {
    textAlign: "left"
  }
});

const Head = props => {
  const { classes } = props;
  return (
    <div className={classes.card}>
      <Typography variant="h4" color="inherit" className={classes.content}>
        {props.name}
      </Typography>
      <Typography variant="body1" color="inherit" className={classes.content}>
        {props.contact}
      </Typography>
      <Typography variant="h5" color="inherit" className={classes.content}>
        {props.head}
      </Typography>
      <Typography variant="h6" color="inherit" className={classes.content}>
        {props.subhead}
      </Typography>
      <Typography variant="body1" color="inherit" className={classes.summary}>
        {props.summary}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Head);

import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  card: {
    maxWidth: "80%",
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    textAlign: "center"
  }
});

const Section = props => {
  const { classes, label, children } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent classes={{ root: classes.content }}>
          {label &&
          <Fragment>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {label}
            </Typography>
            <Divider/>
          </Fragment>
          }
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Section);

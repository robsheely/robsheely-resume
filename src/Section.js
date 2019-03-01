import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme.palette.secondary[ "50" ]
  },
  content: {
    textAlign: "center"
  },
  label: {
    color: theme.palette.secondary[ "600" ]
  },
  divider: {
    marginTop: 6,
    marginBottom: 16,
    backgroundColor: theme.palette.primary.main
  },
  h6: {
    fontWeight: 500
  }
});

const Section = props => {
  const { classes, label, children } = props;
  // Convert spaces to dashes and all chars to lowercase to work as part of ids
  const name = (label) ? label.replace(/\s+/g, "-").toLowerCase() : "none";

  return (
    <div id={`section-${name}`} data-testid={`section-${name}`}>
      <Card className={classes.card}>
        <CardContent
          id={`section-${name}-content`}
          data-testid={`section-${name}-content`}
          classes={{ root: classes.content }}
        >
          {
            label &&
            <Fragment>
              <Typography
                id={`section-${name}-content-label`}
                data-testid={`section-${name}-content-label`}
                variant="h6"
                color="inherit"
                classes={{
                  root: classes.label,
                  h6: classes.h6
                }}>
                {label}
              </Typography>
              <Divider
                id={`section-${name}-content-divider`}
                data-testid={`section-${name}-content-divider`}
                classes={{ root: classes.divider }}
              />
            </Fragment>
          }
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default withStyles(styles)(Section);

import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import MaskedInput from "react-text-mask";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

export const ADD_POSITION = gql`
  mutation SubmitPosition($input: PositionInput!) {
    addPosition(input: $input) {
      id
    }
  }
`;

const styles = theme => ({
  container: {
    width: 600
  },
  actions: {
    padding: 16
  },
  topRow: {
    width: "100%",
    display: "flex"
  },
  textField: {
    width: "100%",
    flexGrow: 1
  },
  achievementsList: {
    width: "100%",
    minHeight: 100
  },
  dateField: {
    marginLeft: 8,
    width: 112
  },
  addButton: {
    marginTop: 16,
    marginLeft: 10,
    marginBottom: 10
  },
  achievementsBox: {
    marginTop: 16,
    marginBottom: 10
  },
  achievementsBorder: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.23)"
  },
  achievementsLabel: {
    position: "absolute",
    transform: "translate(2px, 6px) scale(0.85)",
    backgroundColor: "white",
    paddingLeft: 4,
    paddingRight: 4
  },
  achievementsLabelText: {
    color: "rgba(0, 0, 0, 0.57)"
  }
});

class AddPositionDialog extends React.Component {
  requiredFields = [
    "role",
    "start",
    "end",
    "company"
  ];

  state = {
    role: "",
    start: "",
    end: "",
    company: "",
    achievements: [],
    newAchievement: "",
    errors: {}
  };
  
  reset() {
    this.setState({
      role: "",
      start: "",
      end: "",
      company: "",
      achievements: [],
      newAchievement: "",
      errors: {}
    });
  }

  validate = () => {
    const errors = {};
    let hasError = false;
    this.requiredFields.forEach(field => {
      if (!this.state[ field ] || this.state[ field ].length === 0) {
        errors[ field ] = "Required";
        hasError = true;
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  onFieldChange = ({ target }) => {
    const field = (target.id.substring(target.id.lastIndexOf("-") + 1));
    this.setState({
      [ field ]: target.value
    });
  };

  // Ensure that only digits are input to the date fields
  // <input type="number"> has cross-browser issues, plus it allows the chars: e, ., +, and - 
  textMaskCustom = props => {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/ ]}
        guide={false}
      />
    );
  };

  addAchievement = () => {
    const achievements = this.state.achievements.slice();
    achievements.push(this.state.newAchievement);
    this.setState({
      achievements,
      newAchievement: ""
    });
  };

  addTextField = (field, label, className, mask) => {
    const { classes } = this.props;

    return (
      <TextField
        error={!!this.state.errors[ field ]}
        helperText={this.state.errors[ field ]}
        id={`add-position-dialog-input-${field}`}
        data-testid={`add-position-dialog-input-${field}`}
        label={label}
        className={classes[ className ]}
        value={this.state[ field ]}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          inputComponent: mask
        }}
        onChange={this.onFieldChange} />
    );
  };

  render() {
    const { classes, open, closeDialog } = this.props;

    return (
      <Mutation mutation={ADD_POSITION}>
        {addPosition => {
          const submit = async () => {
            if (this.validate()) {
              const input = {
                role: this.state.role,
                start: parseInt(this.state.start),
                end: parseInt(this.state.end),
                company: this.state.company,
                achievements: this.state.achievements
              };
              await addPosition({ variables: { input } });
              closeDialog();
              this.reset();
            }
          };

          return (
            <Dialog
              id="add-position-dialog"
              data-testid="add-position-dialog"
              open={open}
              onClose={closeDialog}
              onExit={this.onExited}
            >
              <DialogTitle
                id="add-position-dialog-title"
                data-testid="add-position-dialog-title"
              >
                Add Position
              </DialogTitle>
              <DialogContent classes={{ root: classes.container }}>
                <div className={classes.topRow}>
                  {
                    this.addTextField("role", "Role", "textField")
                  }
                  {
                    this.addTextField("start", "Start Year", "dateField", this.textMaskCustom)
                  }
                  {
                    this.addTextField("end", "End Year", "dateField", this.textMaskCustom)
                  }
                </div>
                {
                  this.addTextField("company", "Company", "textField")
                }
                <div className={classes.achievementsLabel}>
                  <Typography className={classes.achievementsLabelText}>
                    Achievements
                  </Typography>
                </div>
                <Paper
                  elevation={0}
                  classes={{
                    root: classes.achievementsBox,
                    elevation0: classes.achievementsBorder
                  }}
                >
                  <List
                    id="add-position-dialog-achievements-list"
                    data-testid="add-position-dialog-achievements-list"
                    className={classes.achievementsList}
                  >
                    {this.state.achievements.map((achievement, id) => (
                      <ListItem
                        id={`add-position-dialog-achievements-list-item-${id}`}
                        data-testid={`add-position-dialog-achievements-list-item-${id}`}
                        className={classes.item}
                        key={id}
                      >
                        <span className={classes.bullet}>•</span>
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))
                    }
                  </List>
                </Paper>
                <div className={classes.topRow}>
                  {
                    this.addTextField("newAchievement", "Add Achievement", "textField")
                  }
                  <Button
                    id="add-position-dialog-add-button"
                    data-testid="add-position-dialog-add-button"
                    disabled={this.state.newAchievement.length === 0}
                    className={classes.addButton}
                    variant="contained"
                    color="secondary"
                    onClick={this.addAchievement}
                  >
                    Add
                  </Button>
                </div>
              </DialogContent>
              <DialogActions classes={{ root: classes.actions }}>
                <Button
                  id="add-position-dialog-cancel-button"
                  data-testid="add-position-dialog-cancel-button"
                  color="primary"
                  onClick={closeDialog}
                >
                  Cancel
                </Button>
                <Button
                  id="add-position-dialog-submit-button"
                  data-testid="add-position-dialog-submit-button"
                  variant="contained"
                  color="primary"
                  onClick={submit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

AddPositionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  closeDialog: PropTypes.func
};

export default withStyles(styles)(AddPositionDialog);
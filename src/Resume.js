import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import Section from "./Section";
import Head from "./HeadSection";
import PositionCard from "./PositionCard";
import Expertise from "./ExpertiseSection";
import SectionList from "./SectionList";
import AddPositionDialog from "./AddPositionDialog";

export const GET_RESUME = gql`
  query getResume {
    resume {
      name
      contact
      head
      subhead
      summary
      expertise {
        id
        content
      }
      proficiencies{
        id
        content
      }
      positions {
        id
        role
        start
        end
        company
        achievements {
          id
          content
        }
      }
      education{
        id
        content
      }
      community{
        id
        content
      }
    }
  }
`;

const styles = theme => ({
  root: {
    textAlign: "center",
    alignContent: "center",
    padding: 32,
    minWidth: 940,
    maxWidth: 1200
  },
  button: {
    marginTop: 10
  }
});

class Resume extends React.Component {
  state = {
    dialogOpen: false
  };

  openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;

    return (
      <Query query={GET_RESUME} fetchPolicy="network-only">
        {({ loading, errors, data, refetch }) => {
          if (loading) {
            return <span>loading...</span>;
          }

          if (errors) {
            return <span>Error</span>;
          }

          const { resume } = data;

          // Order positions by end date
          const positions = resume.positions.sort((a, b) => {
            return (a.end < b.end) ? 1 : -1;
          });

          const closeDialog = () => {
            this.setState({
              dialogOpen: false
            });
            // Our mutation most likely has been called by the dialog, so resend our query to ensure we have the
            // newly-added position
            refetch();
          };

          return (
            <div
              id="resume"
              data-testid="resume"
              className={classes.root}
            >
              <AddPositionDialog
                id="resume-dialog"
                data-testid="resume-dialog"
                open={dialogOpen} closeDialog={closeDialog} />
              <div align="center">
                <Section
                  id="resume-head"
                  data-testid="resume-head"
                >
                  <Head {...resume} />
                </Section>
                <Section
                  id="resume-expertise"
                  data-testid="resume-expertise"
                  label="Areas of Expertise"
                >
                  <Expertise content={resume.expertise} />
                </Section>
                <Section
                  id="resume-proficiencies"
                  data-testid="resume-proficiencies"
                  label="Technical Proficiency"
                >
                  <SectionList name="proficiencies" items={resume.proficiencies} />
                </Section>
                <Section
                  id="resume-experience"
                  data-testid="resume-experience"
                  label="Professional Experience">
                  {positions.map(position => (
                    <PositionCard key={position.id} position={position} />
                  ))}
                  <Button
                    id="resume-add-button"
                    data-testid="resume-add-button"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.openDialog}
                  >
                    Add Position
                  </Button>
                </Section>
                <Section
                  id="resume-education"
                  data-testid="resume-education"
                  label="Education & Training">
                  <SectionList name="education" items={resume.education} />
                </Section>
                <Section
                  id="resume-community"
                  data-testid="resume-community"
                  label="Community Involvement">
                  <SectionList name="community" items={resume.community} />
                </Section>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

Resume.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Resume);
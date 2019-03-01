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
    padding: theme.spacing.unit * 4,
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
      <Query query={GET_RESUME}>
        {({ loading, errors, data, refetch }) => {
          if (!loading) {
            const { resume } = data;

            const positions = resume.positions.sort((a, b) => {
              if (a.end < b.end) {
                return 1;
              }
              return -1;
            });

            const closeDialog = () => {
              this.setState({
                dialogOpen: false
              });
              refetch();
            };

            return (
              <div className={classes.root}>
                <AddPositionDialog open={dialogOpen} closeDialog={closeDialog}/>
                <div align="center">
                  <Section>
                    <Head {...resume} />
                  </Section>
                  <Section label="Areas of Expertise">
                    <Expertise content={resume.expertise}/>
                  </Section>
                  <Section label="Technical Proficiency">
                    <SectionList items={resume.proficiencies}/>
                  </Section>
                  <Section label="Professional Experience">
                    {positions.map(position => (
                      <PositionCard key={position.id} position={position}/>
                    ))}
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.openDialog}>
                      Add Position
                    </Button>
                  </Section>
                  <Section label="Education & Training">
                    <SectionList items={resume.education}/>
                  </Section>
                  <Section label="Community Involvement">
                    <SectionList items={resume.community}/>
                  </Section>
                </div>
              </div>
            );
          }
          return null;
        }}
      </Query>
    );
  }

}

Resume.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Resume);
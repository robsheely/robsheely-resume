import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import Section from "./Section";
import Head from "./Head";
import PositionCard from "./PositionCard";
import Expertise from "./Expertise";
import SectionList from "./SectionList"

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
    paddingTop: theme.spacing.unit * 20
  }
});

class Resume extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={GET_RESUME}>
        {({ loading, errors, data }) => {
          if (!loading) {
            const { resume } = data;

            const positions = resume.positions.sort((a, b) => {
              if (a.end < b.end) {
                return 1;
              }
              return -1;
            });

            return (
              <div className={classes.root}>
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
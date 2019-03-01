const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const uuid = require("uuid/v4");

const DATA = require("./data.json");
const typeDefs = require("./schema");

const schema = buildASTSchema(gql(typeDefs));

const mapIdString = content => {
  const data = {
    id: uuid(),
    content
  };
  return data;
};

const mapPosition = position => {
  const achievementData = position.achievements.map(mapIdString);
  const data = {
    id: uuid(),
    ...position,
    achievements: achievementData
  };
  return data;
};

const root = {
  resume: {
    name: () => DATA.name,
    contact: () => DATA.contact,
    head: () => DATA.head,
    subhead: () => DATA.subhead,
    summary: () => DATA.summary,
    expertise: () => DATA.expertise.map(mapIdString),
    proficiencies: () => DATA.proficiencies.map(mapIdString),
    positions: () => DATA.positions.map(mapPosition),
    education: () => DATA.education.map(mapIdString),
    community: () => DATA.community.map(mapIdString)
  },
  addPosition: ({ input }) => {
    const position = mapPosition(input);
    DATA.positions.push(input);
    return position;
  }
};

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
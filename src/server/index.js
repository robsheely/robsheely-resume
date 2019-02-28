const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const uuid = require("uuid/v4");

const DATA = {
  "name": "Rob Sheely",
  "contact": "Los Osos, CA  93402 | (805) 235-1014 | robsheely@gmail.com | www.linkedin.com/in/rob-sheely",
  "head": "React JS Developer",
  "subhead": "Software Solutions | Technical Leadership | Service Excellence",
  "summary": "Accomplished senior software engineer with extensive experience providing the leadership and support needed to drive the achievement of key organizational development-related goals and objectives.  Skilled at developing and implementing strategy based on a combination of best practices and innovation to deliver products that positively impacts the organization’s bottom line.  Able to build and maintain strong relationships with technical business partners and stakeholders including designers, SME’s and end-clients based on the effectiveness of the solutions presented.  Recognized for the ability to deliver impactful results while leading in fast-paced, dynamic technical environments.",
  "expertise": [
    "Quality Assurance & Testing",
    "Stakeholder Communication",
    "Project Management",
    "Front & Back-End Technologies",
    "Front-End Development Best Practices ",
    "Software Development Life Cycle",
    "Remote Collaboration",
    "Enterprise-Scale Web Applications",
    "Technical Consulting",
    "Strategy & Execution",
    "Business Relationships",
    "Software Engineering"
  ],

  "proficiencies": [
    "Core: JavaScript (including ES6), React JS",
    "Framework: React/Redux , Apollo/GraphQL, Material UI",
    "Styles: CSS3, SASS, JSS",
    "Build Tools: Babel, Webpack, Grunt",
    "Unit Testing: Jest, Enzyme, React Testing Library",
    "Version Control: Git, Svn, Perforce",
    "Back-end: Node, PHP/MySQL",
    "Packaging: npm, yarn",
    "Additional: Photoshop, Illustrator"
  ],
  "positions": [
    {
      "role": "SENIOR SOFTWARE ENGINEER, FRONT-END DEVELOPMENT",
      "start": 2012,
      "end": 2018,
      "company": "Articulate",
      "achievements": [
        "Continually updated and maintained complex web applications as part of a successful company transition to a SaaS model.",
        "Initiated, designed and successfully implemented unit tests to improve reliability during a critical period for the organization.",
        "Worked in collaboration with UX designers, quality assurance and other developers to ensure the highest level of quality possible."
      ]
    },
    {
      "role": "FRONT-END DEVELOPMENT CONSULTANT",
      "start": 1998,
      "end": 2012,
      "company": "Self-Employed",
      "achievements": [
        "Provided wide-ranging front-end development consulting services while working with a number of recognizable organizations including American Express, Universal/Island/DefJam Records, IBM, MGM Studios, Walt Disney Company and Coldwell Banker.",
        "Built strong relationships with client based on the technical solutions presented, the level of service provided and the leadership provided to maximize the business potential."
      ]
    },
    {
      "role": "SENIOR SOFTWARE ENGINEER, FRONT-END DEVELOPMENT",
      "start": 2018,
      "end": 2019,
      "company": "Help.com",
      "achievements": [
        "Successfully facilitated the upgrade of the company’s core React web app to the latest technologies, including: Material UI, GraphQL, Apollo, React-intl, Draft.js, Formik/Yup.",
        "Improved the team’s unit tests by adopting React Testing Library, and insuring over 90% code coverage.",
        "Lead the process of codifying best practices and defining consistent coding standards.",
        "Coached and mentored junior developers during a challenging period of rapid growth."
      ]
    },
    {
      "role": "SOFTWARE ENGINEER",
      "start": 2004,
      "end": 2006,
      "company": "Wild Divine",
      "achievements": [
        "Added valued input while serving on a 2-person team that designed and created a complex biofeedback application.",
        "Successfully integrated custom 3D-rendered graphics and animations and added voice overs, music and other multimedia elements to improve the application's effectiveness."
      ]
    },
    {
      "role": "SENIOR SOFTWARE ENGINEER, FRONT-END DEVELOPMENT",
      "start": 2006,
      "end": 2010,
      "company": "Art & Logic",
      "achievements": [
        "Architected, estimated and successfully built a complex web application for real-time professional photo uploading and editing.",
        "Architected, estimated and successfully built a kiosk for a custom furniture ordering system.",
        "Architected, estimated and successfully built an imaging scanning application for measuring traffic patterns."
      ]
    }
  ],
  "education": [
    "Pursued General Studies – University of Alabama, Tuscaloosa, AL",
    "Recipient of the Randall Research Scholars Program Scholarship",
    "React Nanodegree – Udacity",
    "Divide and Conquer, Sorting and Searching and Randomized Algorithms – Stanford University"
  ],
  "community": [
    "Animal Foster – Woods Humane Society",
    "Animal Foster – San Luis Obispo County Division of Animal Services",
    "Past Foster Parent – Boulder County Department of Housing and Human Services"
  ]
};

const schema = buildASTSchema(gql`
  type Query {
    resume: Resume
  }

  type Resume {
    name: String
    contact: String
    head: String
    subhead: String
    summary: String
    expertise: [ID_String],
    proficiencies: [ID_String]
    positions: [Position]
    education: [ID_String]
    community: [ID_String]
    position(id: ID!): Position
  }

  type ID_String {
    id: ID!
    content: String
  }

  type Position {
    id: ID!
    role: String
    start: Int!
    end: Int!
    company: String
    achievements: [ID_String]
  }

  type Mutation {
    submitPosition(input: PositionInput!): Position
  }

  input PositionInput {
    role: String
    start: Int!
    end: Int!
    company: String
    achievements: [String]
  }
`);

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
  addPosition: ({ positionInput }) => {
    const position = mapPosition(positionInput);
    DATA.positions.push(position);
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
const schema = `
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
    addPosition(input: PositionInput!): Position
  }

  input PositionInput {
    role: String
    start: Int!
    end: Int!
    company: String
    achievements: [String]
  }
`;

module.exports = schema;
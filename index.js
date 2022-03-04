const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  scalar Date

  """
  An object to describe characteristics for documentation of variable
  """
  type SkiDay {
    id: ID!
    date: Date!
    mountain: String!
    condition: Condition
  }

  enum Condition {
    POWDER
    HEADY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    condition: Condition!
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay!
    removeDay(id: ID): RemoveDayPayload!
  }

  type Subscription {
    newDay: SkiDay!
  }
`;

const mocks = {
  Date: () => "1/2/2025"
}

const resolvers = {

};

const server = new ApolloServer({
  typeDefs,
  mocks
});


server
.listen()
.then(({url}) => {
  console.log(`${url}`);
});

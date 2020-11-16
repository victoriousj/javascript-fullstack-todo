const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    text: String!
    isDone: Boolean!
    user: User!
  }

  type LoginResult {
    success: Boolean!
    user: User
  }

  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    task(id: Int!): Task
    allTasks: [Task!]!
    allTasksForUser(id: Int!): [Task!]!
    login(email: String! password: String!): LoginResult
  }

  type Mutation {
    createUser (
      name: String!
      email: String!
      password: String!
    ) : User!

    loginUser (
      email: String!
      password: String!
    ) : LoginResult

    createTask (
      userId: Int!
      text: String!
    ) : Task!

    toggleTaskCompletion (id: Int!, isDone: Int!): Task!
  }
`;

module.exports = typeDefs
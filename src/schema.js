const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    text: String!
    isDone: Boolean!
    user: User!
  }

  type loginResult {
    success: Boolean!
    user: User
  }

  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    task(id: Int!): Task
    allTasks: [Task!]!
    allTasksForUser(id: Int!): [Task!]!
    login(userName: String! password: String!): loginResult
  }

  type Mutation {
    createUser (
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ) : User!

    createTask (
      userId: Int!
      text: String!
    ) : Task!

    toggleTaskCompletion (id: Int!, isDone: Int!): Task!
  }
`;

module.exports = typeDefs
import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  query {
    allUsers {
      id,
      firstName,
      lastName,
      email
    }
  }
`;

export const ALL_TASKS_FOR_USER = gql`
  query ($id: Int!) {
    allTasksForUser(id: $id) {
      id,
      text,
      isDone
    }
  }
`;

export const GET_TASKS = gql`
  {
    allTasks {
      id,
      text,
      isDone
    }
  }
`;

export const TOGGLE_TASK_COMPLETION = gql`
  mutation ($id: Int!, $isDone: Int!) {
    toggleTaskCompletion(id: $id, isDone: $isDone) {
      id,
      text,
      isDone
    }
  }
`;
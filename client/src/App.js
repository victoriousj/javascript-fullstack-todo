import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS, ALL_TASKS_FOR_USER } from "./Queries";
import { Card, CardBody, CardHeader, Spinner, CardSubtitle } from 'reactstrap';

function App() {
  const USER_ID = 1;
  const getAllUsers = useQuery(GET_USERS);
  const allTasksForUser = useQuery(ALL_TASKS_FOR_USER, { variables: { id: USER_ID } });
  if (getAllUsers.loading || allTasksForUser.loading) return <Spinner color="dark" />;
  if (getAllUsers.error || allTasksForUser.error) return <React.Fragment>Error :(</React.Fragment>;

  const users = (
    getAllUsers.data.allUsers.map(user => {
      return <div>{user.firstName}</div>
    })
  );

  const tasks = (
    allTasksForUser.data.allTasksForUser.map(task => {
      return <div>
        <ul>
          <li>{task.id}</li>
          <li>{task.text}</li>
          <li>{task.isDone.toString()}</li>
        </ul>
      </div>
    })
  );


  return (
    <div className="container">
      <Card>
        <CardHeader>Query - Displaying all data</CardHeader>
        <CardBody>
          <pre>
            {users}
          </pre>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Query - Displaying data with args</CardHeader>
        <CardBody>
          <CardSubtitle>{`Viewing tasks for user with id: ${USER_ID}`}</CardSubtitle>
          <pre>
            {tasks}
          </pre>
        </CardBody>
      </Card>
    </div>
  )
}

export default App;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS, ALL_TASKS_FOR_USER, TOGGLE_TASK_COMPLETION } from "../Queries";
import { Card, CardBody, CardHeader, Spinner, CardSubtitle, ListGroup, ListGroupItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Todo() {
  const [user, setUser] = useState(1);
  const getAllUsers = useQuery(GET_USERS);
  const toggle = () => setOpen(!dropdownOpen);
  const [dropdownOpen, setOpen] = useState(false);
  const [toggleTaskCompletion] = useMutation(TOGGLE_TASK_COMPLETION);
  const allTasksForUser = useQuery(ALL_TASKS_FOR_USER, { variables: { id: user } });
  if (getAllUsers.loading || allTasksForUser.loading) return <Spinner color="dark" />;
  if (getAllUsers.error || allTasksForUser.error) return <React.Fragment>Error :(</React.Fragment>;

  const users = (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>User</DropdownToggle>
      <DropdownMenu>
        {getAllUsers.data.allUsers.map(user => {
          return <DropdownItem onClick={() => setUser(user.id)}>{user.firstName}</DropdownItem>
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );

  const tasks = (
    <ListGroup>
      {allTasksForUser.data.allTasksForUser.map((task, index) =>
        <ListGroupItem
          onClick={() => toggleTaskCompletion({ variables: { id: task.id, isDone: task.isDone ? 0 : 1 } })}
          className={task.isDone ? 'active' : ''}>
          {index + 1}. {task.text}
        </ListGroupItem>
      )}
    </ListGroup>
  );


  return (
    <div className="container">
      <Card>
        <CardHeader>Query - Displaying all data</CardHeader>
        <CardBody>
          {users}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Query - Displaying data with args</CardHeader>
        <CardBody>
          <CardSubtitle>{`Viewing tasks for user with id: ${user}`}</CardSubtitle>
          {tasks}
        </CardBody>
      </Card>
    </div>
  )
}

export default Todo;

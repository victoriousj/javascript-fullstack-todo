import { LOGIN } from "../Queries";
import { Button, Col, Container, Divider, Form, FormGroup, Label, Input } from 'reactstrap';
import { useLazyQuery } from "@apollo/client";

function Login() {
  const [runQuery, { loading, data }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      console.log('invoked onCompleted', data);
      sessionStorage.setItem('userName', data.login.user.userName);
      sessionStorage.setItem('userId', data.login.user.id)
    },
    onError(err) {
      console.log('onerror', err);
    },
  });

  const submitLogin = (event) => {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    runQuery({ variables: { userName: event.target[0].value, password: event.target[1].value } });
  }

  const results = loading ? (<span>waiting...</span>) : !!data ? <span>{data.login.success}</span> : <span></span>;

  return (
    <Container>
      <h2>Login</h2>
      <hr />
      <Form onSubmit={submitLogin}>
        <FormGroup row>
          <Label sm={2} for="username">Username: </Label>
          <Col sm={10}>
            <Input required type="text" name="username" id="username" placeholder="Username" />
          </Col>
        </FormGroup>
        {' '}
        <FormGroup row>
          <Label sm={2} for="password">Password</Label>
          <Col sm={10}>
            <Input type="password" required name="password" id="password" placeholder="Password" />
          </Col>
        </FormGroup>
        {' '}
        <hr />
        <Button type="submit">Submit</Button>
      </Form>
      {results}
      {data && data.login && <span>{data.login.success}</span>}
    </Container >
  )
}

export default Login;
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER, CREATE_USER } from "../Queries";
import { Button, Container, FormGroup, Label, Input } from 'reactstrap';

const initialState = { password: "", login: true, email: "", name: "" };

function Login() {
  const [loginState, setLoginState] = useState({ ...initialState });
  const { login, email, name, password } = loginState;
  const router = useRouter();

  const submitLogin = (event) => {
    event.preventDefault();
    submitLoginMutation({ variables: { email, password } });
  };

  const [submitLoginMutation] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      if (data.loginUser.success) {
        localStorage.setItem("auth-token", data.loginUser.user.id);
        localStorage.setItem("user-name", data.loginUser.user.name);
        router.push('/');
      } else {
        throw new Error("Invalid Username/Password");
      }
    },
    onError(err) {
      setLoginState({ ...initialState })
    }
  });

  const createUser = (event) => {
    event.preventDefault();
    createUserMutation({ variables: { email, password, name } });
  }

  const [createUserMutation] = useMutation(CREATE_USER, {
    onCompleted(data) {
    },
    onError(err) {
      setLoginState({ ...initialState })
    },
  });

  return (
    <Container>
      <h4 className="text-primary">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <FormGroup>

            <Label for="name">Name:</Label>
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={e => setLoginState(prevState => ({ ...prevState, name: e.target.value }))}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            required
            id="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={e => setLoginState(prevState => ({ ...prevState, email: e.target.value }))}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password: </Label>
          <Input
            value={password}
            onChange={e => setLoginState(prevState => ({ ...prevState, password: e.target.value }))}
            type="password"
            placeholder="Password"
            className="form-control" />
        </FormGroup>
      </div>
      <Button
        className="pointer mr-2 button"
        onClick={login ? submitLogin : createUser}
        color="primary"
      >
        {login ? "Login" : "Create Account"}
      </Button>
      <span className="pointer button text-primary" onClick={() => setLoginState({ login: !login })}>
        {login ? "Need to create an account?" : "Already have an account?"}
      </span>
    </Container>
  )
}

export default Login;
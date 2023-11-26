import React from "react";
import Button from "../../components/Button/Button";
import Input, { InputTypes } from "../../components/Input/Input";
import styles from "./LoginForm.module.scss";
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <form className={styles.wrapper}>
      <div className={styles.title}>Sign In</div>
      <Input
        id="username"
        name="username"
        labelText="Username:"
        inputType={InputTypes.Text}
        placeholder="Enter username.."
      />
      <Input
        id="email"
        name="email"
        labelText="Email:"
        inputType={InputTypes.Text}
        placeholder="Enter email.."
      />
      <Input
        id="password"
        name="password"
        labelText="Password:"
        inputType={InputTypes.Password}
        placeholder="Enter password.."
      />

      <Button label="Sign in" onClick={() => {}} />
      <Link className={styles.link} to="/register">Don't have an account?</Link>
    </form>
  );
};

export default LoginForm;

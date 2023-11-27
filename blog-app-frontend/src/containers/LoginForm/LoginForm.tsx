import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Button from "../../components/Button/Button";
import Input, { InputTypes } from "../../components/Input/Input";
import styles from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import UserService, { UserRequestInput } from "../../services/UserService";
import LocalStorageHandler from '../../utils/LocalStorage';
import { JwtToken } from "../../utils/JwtTokenHandler";
import AuthContext from "../../context/AuthContext";

interface InputErrors{
  username:false;
  email:false;
  password:false;
}

const LoginForm: React.FC = () => {
  const [formInput, setFormInput]: [
    UserRequestInput,
    Dispatch<SetStateAction<UserRequestInput>>
  ] = useState({ username: "", email: "", password: "" });

  const [errors, setErrors]:[InputErrors, Dispatch<SetStateAction<InputErrors>>]
  = useState({ username: false, email: false, password:false });

  const {setToken} = useContext(AuthContext);

  const navigator = useNavigate();

  const onChangeValue = (e:any) => {
    const { value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async (e:any) =>{
    e.preventDefault();

    if (Object.values(errors).some((err) => err === true)|| Object.values(formInput).some((val) => val === '')) {
      return;
    }

    try {
      const result: JwtToken = await UserService.loginUser(formInput);
      LocalStorageHandler.setToStorage(result.token);
      setToken(LocalStorageHandler.getFromStorage());
      navigator("/posts");
    } catch {
      navigator("/error");
    }
  }

  const onBlur = (e: any) => {
    const { value } = e.target;

    if (!value) {
      setErrors((prevFormInput) => ({
        ...prevFormInput,
        [e.target.name]: true,
      }));
    } else {
      setErrors((prevFormInput) => ({
        ...prevFormInput,
        [e.target.name]: false,
      }));
    }
  };

  return (
    <form className={styles.wrapper}>
      <div className={styles.title}>Sign In</div>
      <Input
        id="username"
        name="username"
        labelText="Username:"
        inputType={InputTypes.Text}
        placeholder="Enter username.."
        onChange={onChangeValue}
        value={formInput.username}
        hasError={errors.username}
        onBlur={onBlur}
      />
      <Input
        id="email"
        name="email"
        labelText="Email:"
        inputType={InputTypes.Text}
        placeholder="Enter email.."
        onChange={onChangeValue}
        value={formInput.email}
        hasError={errors.email}
        onBlur={onBlur}
      />
      <Input
        id="password"
        name="password"
        labelText="Password:"
        inputType={InputTypes.Password}
        placeholder="Enter password.."
        onChange={onChangeValue}
        value={formInput.password}
        hasError={errors.password}
        onBlur={onBlur}
      />

      <Button label="Sign in" onClick={onSubmit} />
      <Link className={styles.link} to="/register">
        Don't have an account?
      </Link>
    </form>
  );
};

export default LoginForm;

import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from "../../components/Button/Button";
import Input, { InputTypes } from "../../components/Input/Input";
import styles from './ReigsterForm.module.scss';
import { Link } from 'react-router-dom';
import UserService, { UserRequestInput } from "../../services/UserService";


interface InputErrors{
  username:false;
  email:false;
  password:false;
  repassword:false;
}


const RegisterForm:React.FC = () => {
  const [formInput, setFormInput]: [
    UserRequestInput,
    Dispatch<SetStateAction<UserRequestInput>>
  ] = useState({ username: "", email: "", password: "" });

  const [errors, setErrors]:[InputErrors, Dispatch<SetStateAction<InputErrors>>]
  = useState({ username: false, email: false, password:false, repassword:false });

  const onChangeValue = (e:any) => {
    const { value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [e.target.name]: value,
    }));
  };


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

  const checkRepeatPassword = (e:any)=>{
    const {value} = e.target;

    if (value !== formInput.password || value==="") {
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
  }

  const onSubmit = async (e:any) =>{
    e.preventDefault();

    if(Object.values(errors).some(err=>err===true)){
      return;
    }
    const result = await UserService.registerUser(formInput)
  }

    return (
      <form className={styles.wrapper}>
        <div className={styles.title}>Sign Up</div>
        <Input
          id="username"
          name="username"
          labelText="Username:"
          inputType={InputTypes.Text}
          placeholder="Enter username.."
          hasError={errors.username}
          onChange={onChangeValue}
          onBlur={onBlur}
          value={formInput.username}
        />
        <Input
          id="email"
          name="email"
          labelText="Email:"
          inputType={InputTypes.Text}
          placeholder="Enter email.."
          hasError={errors.email}
          onChange={onChangeValue}
          onBlur={onBlur}
          value={formInput.email}
        />
        <Input
          id="password"
          name="password"
          labelText="Password:"
          inputType={InputTypes.Password}
          placeholder="Enter password.."
          hasError={errors.password}
          onChange={onChangeValue}
          onBlur={onBlur}
          value={formInput.password}
        />
        <Input
          id="repassword"
          name="repassword"
          labelText="Re password:"
          inputType={InputTypes.Password}
          placeholder="Repeat password.."
          hasError={errors.repassword}
          onBlur={(e) => {
            onBlur(e);
            checkRepeatPassword(e);
          }}
        />

        <Button label="Sign up" onClick={onSubmit} />
        <Link className={styles.link} to="/login">
          Already have an account?
        </Link>
      </form>
    ); 
}
 
export default RegisterForm;
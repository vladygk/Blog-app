import React from 'react';
import Button from "../../components/Button/Button";
import Input, { InputTypes } from "../../components/Input/Input";
import styles from './ReigsterForm.module.scss';
import { Link } from 'react-router-dom';

const RegisterForm:React.FC = () => {
    return ( 
        <form className={styles.wrapper}>
        <div className={styles.title}>Sign Up</div>
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
         <Input
          id="repassword"
          name="repassword"
          labelText="Re password:"
          inputType={InputTypes.Password}
          placeholder="Repeat password.."
        />
  
        <Button label="Sign up" onClick={() => {}} />
        <Link className={styles.link} to="/login">Already have an account?</Link>
      </form>
     ); 
}
 
export default RegisterForm;
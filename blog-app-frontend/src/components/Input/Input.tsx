import React from 'react';
import styles from './Input.module.scss';

export enum InputTypes{
    Text,
    Password,
}

interface InputProps{
    id:string;
    name:string;
    placeholder:string;
    inputType: InputTypes;
    labelText:string;
}

const Input:React.FC<InputProps> = ({id,name,placeholder, inputType, labelText}) => {

    let type;
    if(inputType === InputTypes.Text ){
        type = "text";
    }else if(inputType === InputTypes.Password){
        type = "password";
    }

    return (
        <div className={styles.wrapper}>
            <div>
             <label className={styles.label} htmlFor={id}>{labelText}</label></div>
             <input className={styles.inputField} type={type} id={id} name={name} placeholder={placeholder}/>
        </div>
      );
}
 
export default Input;

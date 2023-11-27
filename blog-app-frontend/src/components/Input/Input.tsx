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
    onChange?:(e:any)=>void;
    onBlur:(e:any)=>void;
    value?:any;
    hasError:boolean;
}

const Input:React.FC<InputProps> = ({id,name,placeholder, inputType, labelText,onBlur, onChange, value, hasError}) => {

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
             <input onBlur={onBlur} value={value} onChange={onChange} className={hasError?styles.error: styles.inputField} type={type} id={id} name={name} placeholder={hasError?"Invalid input": placeholder}/>
            
        </div>
        
      );
}
 
export default Input;

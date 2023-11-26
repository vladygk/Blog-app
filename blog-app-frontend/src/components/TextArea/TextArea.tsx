import React from 'react';
import styles from './TextArea.module.scss';

interface TextAreaProps{
    id:string;
    name:string;
    placeholder:string;
    labelText:string;
}

const TextArea:React.FC<TextAreaProps> = ({id,name,placeholder, labelText}) => {
    return (
        <div className={styles.wrapper}>
            <div>
             <label className={styles.label} htmlFor={id}>{labelText}</label></div>
             <textarea className={styles.textField} id={id} name={name} placeholder={placeholder}/>
        </div>
      );
}
 
export default TextArea;

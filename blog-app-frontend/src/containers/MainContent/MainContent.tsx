import React from 'react';
import styles from './MainContent.module.scss';


interface MainContentProps{
    children:React.ReactNode;
}

const MainContent:React.FC<MainContentProps> = ({children}) => {
    return (  
        <main className={styles.container}>
            {children}
        </main>
    );
}
 
export default MainContent;
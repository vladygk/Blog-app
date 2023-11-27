class LocalStorageHandler{
     setToStorage = ( value:string) => {
        localStorage.setItem("jwtToken",value);
    }

     getFromStorage = () => {
        return localStorage.getItem('jwtToken');
    }

    removeFormStorage=()=>{
        localStorage.removeItem("jwtToken");
    }
    
}

export default new LocalStorageHandler();
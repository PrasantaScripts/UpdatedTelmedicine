import { Redirect, useHistory } from "react-router-dom";


const Protect = ({ children }) => {
    const history = useHistory()
 const isAuth = localStorage.getItem('isAuth');
 console.log("yes");
 
    if (isAuth=='false' || !isAuth) {
        history.push('/');
    }
 
    return children;
};

export default Protect;
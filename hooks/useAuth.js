// 2 functions to implement react hooks with effect and state
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
    // react will define state variable and associte function
    const [ user, setUser ] =  useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // react will mange our state variable based on our function
    useEffect(
        () => {
            auth.onAuthStateChanged(

              (user) => {
                // set react state based on user
                // set IsLoggedIn variable
                setIsLoggedIn( user && user.uid ? true: false); 
                // set react state variable user
                setUser( user );
              });
        });
    return { user, isLoggedIn };    
};

export default useAuth;
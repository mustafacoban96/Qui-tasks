import { createContext,useContext,useEffect,useState } from "react";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from "firebase/auth";

import { auth } from "../firebase/firebase";



const UserContext = createContext({});


export const AuthContextProvider = ({children}) =>{
    
    const [user,setUser] = useState({});
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));


    //create user
    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //token set
    const setToken = (token) =>{
        _setToken(token);

        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
            if(currentUser){
                currentUser.getIdToken().then(function(idToken) {
                    setToken(idToken)
                    setUser(currentUser)
                    
                })
            }
            else{
                console.log("Current user is null or undefined")
            }
        });
        return () => {
            unsubscribe();
        }
    },[]);

    const logout = () =>{
        localStorage.removeItem('ACCESS_TOKEN');
        return signOut(auth);
    }
    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    return (
        <UserContext.Provider value={{createUser,token,user,logout,signIn}}>
            {children}
        </UserContext.Provider>
    )



}

export const UserAuth = () =>{
    return useContext(UserContext);
}
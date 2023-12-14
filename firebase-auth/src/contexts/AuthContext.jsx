import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from "../firebase";


const UserContext = createContext();



export const AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState({});

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    };

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
            // currentUser.getIdToken().then((idToken) =>{
            //     console.log(idToken)
            //console.log(currentUser)
                
            // });
            //return idToken
            //console.log(currentUser.accessToken)
            setUser(currentUser)
        });

        return () =>{
            unsubscribe();
        }
    })

    const logout = () =>{
        return signOut(auth);
    }

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    return (
        <UserContext.Provider value={{createUser,user,logout,signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(UserContext);
}
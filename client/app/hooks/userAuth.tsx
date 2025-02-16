/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useSelector } from "react-redux";


export default function useUserAuth() {
        const {user}= useSelector((state:any) => state.auth);
    
    if(user){
        return true
    }
    else{
        return false
    }
}




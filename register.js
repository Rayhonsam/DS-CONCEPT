import React from "react";
import { useState,useEffect,us } from "react";
import { getDocs,addDoc,collection,updateDoc,query,where } from "firebase/firestore";
import { db } from "../serviceAccountKey";
import { useNavigate } from "react-router-dom";
const Register1=()=>{
    const[name,setname]=useState("")
    const[mail,setmail]=useState("")
    const[password,setpassword]=useState("")
    const usercollectionref=collection(db,"users");
    const navigate=useNavigate();
    const submit=async()=>{
        const q=query(usercollectionref,
            where("mail","==",mail));
        try
        {
            const querysnapshot=await getDocs(q);
            if(querysnapshot.size==1)
            {
               alert(`${mail} already exists`);
            }
            else
            {
                await addDoc(usercollectionref,{name:name,mail:mail,password:password});
                navigate("/login");
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return(
        <>
        <h1>registration page</h1>
        <h1>enter the name</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
        <h1>enter the mail id</h1>
        <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)}/>
        <h1>enter the name</h1>
        <input type="text" name="name" onChange={(e)=>setpassword(e.target.value)}/>
        <input type="submit" onClick={submit}/>
        </>
    )
}

export default Register1;
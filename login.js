import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getDocs,query,where,collection } from "firebase/firestore";
import { db } from "../serviceAccountKey";

const Login1=()=>{
  const[mail,setmail]=useState("");
  const[password,setpassword]=useState("");
  const usercollectionref=collection(db,"users");
  const navigate=useNavigate();
  const handleLogin=async()=>{
    const q=query(usercollectionref,
      where("mail","==",mail),
      where("password","==",password));
      try
      {
          const querysnapshot=await getDocs(q);
          if(querysnapshot.size==1)
          {
            alert(`logeed in as ${mail}`);
            navigate("/profile",{state:{mail:mail,password:password}});
          }
          else
          {
            alert("invalid login");
          }
      }
      catch(err)
      {
        console.log(err);
      }
  }
  return(
<>
<h1>Login page</h1>
      <h1>Enter the mail id</h1>
      <input type="text" name="mail" onChange={(e) => setmail(e.target.value)} />
      <h1>Enter the password</h1>
      <input type="password" name="password" onChange={(e) => setpassword(e.target.value)} />
      <input type="submit" value="Login" onClick={handleLogin} /></>
  )
}

export default Login1;
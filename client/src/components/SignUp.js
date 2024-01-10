import React, { useState } from 'react'
import Axios from "axios";
//import Cookies from 'universal-cookie'

function SignUp() {
    //const cookies = new Cookies();
    const [user,setUser]=useState(null)
    const signUp=()=>{
        Axios.post("http://localhost:3001/signup", user).then(res => {
            console.log(res)
            const {firstName, lastName, username, hashedPassword} = res.data;
            console.log("O user " + firstName +" "+ lastName +" fez login.");
        })
    };

  return (
    <div className="signup">
        <label>SignUp</label>
        <input placeholder="First Name" onChange={(event)=>{
            setUser({...user, firstName: event.target.value});
        }}/>
        <input placeholder="Last Name" onChange={(event)=>{
            setUser({...user, lastName: event.target.value});
        }}/>
        <input placeholder="Username" onChange={(event)=>{
            setUser({...user, username: event.target.value});
        }}/>
        <input placeholder="Password" onChange={(event)=>{
            setUser({...user, password: event.target.value});
        }}/>
        <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default SignUp
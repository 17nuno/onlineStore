import React, {useState} from 'react'
import Axios from "axios";
import HomePage from './HomePageComponent'
import { Navigate, useRoutes, useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser]=useState(null);
    const navigate=useNavigate();
    const login=()=>{
        console.log(user);
        Axios.post("http://localhost:3001/login", user).then(res => {
            //console.log(res);
            const {username} = res.data;
            //console.log("O user " + firstName +" "+ lastName +" fez login.");
            if(username){
                console.log("aa" + username);
                //return <HomePage/>;
                //return <Navigate to="/homepage"/>
                navigate("/homepage")

            }
            else{
                console.log("Não está correto")
            }
        })
    };


  return (
    <div className="login">
        <label>Login</label>
        <input placeholder="Username" onChange={(event)=>{
            setUser({...user, username: event.target.value});
        }}/>
        <input placeholder="Password" onChange={(event)=>{
            setUser({...user, password: event.target.value});
        }}/>
        <button onClick={login}>Login</button>
    </div>
    
  )
}

export default Login
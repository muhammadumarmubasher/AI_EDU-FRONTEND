import React, {useState} from "react";
import axios from "axios";
import "./Login.css";


function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const handleLogin = async()=>{

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{
email,
password
}
);


localStorage.setItem("token",res.data.token);

alert("Login Successful");


}catch(error){

alert("Login Failed");

}

};



return(

<div className="login-page">

<div className="login-card">

<h1>
Welcome Back
</h1>

<p>
Login to AI Edu System
</p>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button onClick={handleLogin}>
Login
</button>


</div>

</div>

)

}


export default Login;
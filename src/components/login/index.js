import {Component} from "react";

import Cookies from "js-cookie";

import "./index.css";
class Login extends Component {


  state = {
    name: '',
    password: '',
    errorMessage:"",
    register:false
  };

  changeUsername = (e) => {
    this.setState({name: e.target.value});
  };
  changePassword = (e) => {
    this.setState({password: e.target.value});
  };
  submitForm = async(e) => {
    e.preventDefault();
    const {name, password,register} = this.state;
    
    const api=register?
    "https://syncthreadbackenddaveed.onrender.com/register"
    :"https://syncthreadbackenddaveed.onrender.com/login"

    const user={
        name: name,
        password: password
    }
    const option={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

  try{
    const fetching= await fetch(api,option);
    const data= await fetching.json();
    console.log(data);
    if(fetching.ok){
        alert("Login Successful");
        this.props.history.replace("/dashboard");
        this.setState({errorMessage:""});
        console.log(data.token);
        Cookies.set('jwtTokenSyncthread', data.token);
    }
    else{
       
        this.setState({errorMessage:data.message});
        if(!register){
            this.setState({register:true});
        }
    }

  }
  catch(error){
    console.log("error",error);
    this.setState({errorMessage:"Something went wrong"});
    }


    
  };

  render(){
    const {name, password,errorMessage,register} = this.state;
    const jwtToken=Cookies.get("jwtTokenSyncthread");
    if(jwtToken){
        this.props.history.replace("/dashboard");
    }

    return(

        <div className="loginForm">
            <form onSubmit={this.submitForm}>
              {register?<h1>Register Form</h1>:<h1>Login form</h1>}
                <label>Username: </label>
                <input type="text" placeholder="Username" value={name} onChange={this.changeUsername} required/>
                
            
                <label>Password:</label> 
                <input type="password" placeholder="Password" value={password} onChange={this.changePassword} required/>
               <span style={{color:"red"}}>{errorMessage}</span>
                <br/>
                <button className="loginButton" type="submit">{register?"Register":"Login"}</button>
                {
                  !register?
                  <p>Don't have an account? <span style={{textDecoration:"Underline"}} onClick={()=>this.setState({register:true})}>Register here</span></p>:
                  <p>Already have an account? <span style={{textDecoration:"Underline"}} onClick={()=>this.setState({register:false})}>Login here</span></p>
                }
            </form>
           
            
        </div>
    )
  }
}


export default Login;
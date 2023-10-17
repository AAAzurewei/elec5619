import React from "react";
import { useState } from 'react';
import Register from "./Register";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Main from "./Main";



import image32 from '../resources/image23.png';
import user from "../resources/user.svg";
import icon_eye from "../resources/icon _eye_.svg";
import logogoogle from "../resources/logogoogleg48dp.svg";


export default function Loginpage() {


const cookies = new Cookies('userCookie',{path:'/'});
const [submitstatus,setSubmitstatus] = useState("typing");

const [page, setPage] = useState("login");

const [state, setState] = useState("0");

const [loginForm, setLoginform] = useState({
  username: "yours@Gmail.com",
  password: "",
});

const onChangeForm = (label, event) => {
  switch (label) {
    case "email":
      setLoginform({ ...loginForm, username: event.target.value });
      break;
    case "password":
      setLoginform({ ...loginForm, password: event.target.value });
      break;
  }
};

if(page === 'register'){

  return <Register />
}
if(page === 'map'){

  return <Main />
}

function Statemessage(){
  axios
  .get('login.json')

  .then(Response =>{
    
    if(Response.data.code === 200){
      cookies.set('userCookie',Response.data.data)
      alert(cookies.get('userCookie'));
    }else{
      alert(Response.data.msg);
    }
    //console.log(Response.data); 
  })
  .catch(error =>{
    alert(error);
    //console.log(error)
  })
  
}


async function HandleSubmit(e){
  //e.preventDefault();
  setSubmitstatus("submitting login information");

  axios.post('campuslink.shiropure.com/xxx',loginForm)
  .then((Response)=>{
    if(Response.data.code === 200){
      cookies.set('userCookie',Response.data.data.token)
      //alert(Response.data.data);
      setSubmitstatus("submit success");
    }
    else{
      alert(Response.data.msg);
    }
    
  })
  .catch(error =>{
    setSubmitstatus('error');
    alert(error);
  });
  
}




  return(
    <div className={"image23Parent"}>
            
            <img className={"logo"} alt="" src={image32} />
            <h1 className={"loginmark"}>login</h1>
            
              <div className={"FieldwithImage"}>
                <img className={'userIcon1'} alt="" src={user} />
                <input 
                  type='text'
                  className={"loginpageField"}
                  placeholder="email"
                  
                  onChange = {(e) => onChangeForm('email',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye}/>
                  <input 
                    className={"loginpageField"}
                    type = 'password'
                    placeholder="password"                    
                    onChange = {(e) => onChangeForm('password',e)}
                  />
              </div>
              
            
                        
            <h2 className={'forgetPassword'}>forget password?</h2>

            <div className="FieldwithImage">
              <button className={'loginWrapper'}
                      onClick = {()=>{HandleSubmit()}}
                >login</button>
            </div>

            <div className="FieldwithImage">
              
                <button className={'loginWrapper'}
                        onClick = {() => {setPage("register")}}
                  >register</button>  
              
              
            </div>

            <div className="FieldwithImage">
                
              
                <button className={'loginWrapper'}
                        onClick = {() => {setPage("map")}}
                  >map</button>  
              
              
            </div>
           
            <button className={'officialButtonsSignInWit1'}>
                <img className={'logoGoogleg48dp1'} alt="" src={logogoogle} />
                <div className={'signInWith1'}>Sign in with Google</div>
            </button>

        </div>
  )

} 
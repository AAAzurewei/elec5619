import React from "react";
import { useState } from 'react';
import Loginpage from "./Loginpage";
import axios from 'axios';
import Cookies from "universal-cookie";

import image32 from '../resources/image23.png';
import user from "../resources/user.svg";
import icon_eye from "../resources/icon _eye_.svg";
import logogoogle from "../resources/logogoogleg48dp.svg";
import name from "../resources/register_nameicon.svg";
import nickname from "../resources/register_nickicon.png";


export default function Resister() {

const cookies = new Cookies('RegisCookie',{path:'/'});
const [confirmpassword, setConfirmPassword] = useState('');

const [submitstatus,setSubmitstatus] = useState("typing");

const [RegisterForm, setRegisterform] = useState({
  email: "yours@Gmail.com",
  firstname: "firstname",
  lastName: "lastname",
  middleName: "middlename",
  password: "",
  nickname: "",
});

const onChangeForm = (label, event) => {
  switch (label) {
    case "email":
      
      setRegisterform({ ...RegisterForm, email: event.target.value });
      break;
    case "firstname":
      setRegisterform({ ...RegisterForm, firstname: event.target.value });
      break;
    case "lastName":
      setRegisterform({ ...RegisterForm, lastName: event.target.value });
      break;
    case "middleName":
      setRegisterform({ ...RegisterForm, middleName: event.target.value });
      break;
    case "password":
      setRegisterform({ ...RegisterForm, password: event.target.value });
      break;
    case "nickname":
      setRegisterform({ ...RegisterForm, nickname: event.target.value });
      break;
  }
};

async function HandleSubmit(e){
  //e.preventDefault();
  setSubmitstatus("submitting resigter information");
  axios.post('campuslink.shiropure.com/xxx',RegisterForm)
  .then((Response)=>{
    if(Response.data.code === 200){
      cookies.set('RegisCookie',Response.data.data.token)
      alert(Response.data.data.token);
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


const [page, setPage] = useState("register");

if(page === 'login'){
  return <Loginpage />
}



  return(
    <div className={"image23Parent"}>
            <img className={"logo"} alt="" src={image32} />
            <h1 className={"loginmark"}>register</h1>


            
              <div className={"FieldwithImage"}>
                <img className={'userIcon1'} alt="" src={user} />
                <input 
                  type='email'
                  className={"loginpageField"}
                  placeholder="1234@Gmail.com"                  
                  onChange = {(e) => onChangeForm('email',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                <img className={'userIcon1'} alt="" src={name} />
                <input 
                  type='text'
                  className={"loginpageField"}
                  placeholder="firstname"                  
                  onChange = {(e) => onChangeForm('firstname',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                <img className={'userIcon1'} alt="" src={name} />
                <input 
                  type='text'
                  className={"loginpageField"}
                  placeholder="middlename"                  
                  onChange = {(e) => onChangeForm('middlename',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                <img className={'userIcon1'} alt="" src={name} />
                <input 
                  type='text'
                  className={"loginpageField"}
                  placeholder="lastname"                  
                  onChange = {(e) => onChangeForm('lastname',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconnickname'} alt="" src={nickname} />
                  <input 
                    type = 'text'
                    className={"loginpageField"}
                    placeholder="nickname"
                    onChange = {(e) => onChangeForm('nickname',e)}
                  />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} />
                  <input 
                    className={"loginpageField"}
                    type='password'
                    placeholder="password"
                    
                    onChange = {(e) => onChangeForm('password',e)}
                  />
                  
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} />
                  <input 
                    className={"loginpageField"}
                    type='password'
                    placeholder="confirm Password"                    
                    onChange = {e => setConfirmPassword(e.target.value)}
                  />
              </div>
            

            <div className="FieldwithImage">
              <button className={'loginWrapper'}
                      onClick = {()=>{HandleSubmit()}}
                >register</button>
            </div>

            <div className="FieldwithImage">
              <button className={'loginWrapper'}
                      onClick = {() => {setPage("login")}}
                >login</button>
            </div>

                        
            <button className={'officialButtonsSignInWit1'}>
                <img className={'logoGoogleg48dp1'} alt="" src={logogoogle} />
                <div className={'signInWith1'}>Sign in with Google</div>
            </button>

        </div>
  )

} 
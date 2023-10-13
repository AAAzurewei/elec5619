import React from "react";
import { useState } from 'react';
import Loginpage from "./Loginpage";
import axios from 'axios';
import Cookies from "universal-cookie";

import image32 from '../resources/image23.png';
import user from "../resources/user.svg";
import icon_eye from "../resources/icon _eye_.svg";
import logogoogle from "../resources/logogoogleg48dp.svg";


export default function Resister() {

const cookies = new Cookies('RegisCookie',{path:'/'});
const [confirmpassword, setConfirmPassword] = useState('');

const [submitstatus,setSubmitstatus] = useState("typing");

const [RegisterForm, setRegisterform] = useState({
  email: "yours@Gmail.com",
  password: "",
  nickname: "",
});

const onChangeForm = (label, event) => {
  switch (label) {
    case "email":
      setRegisterform({ ...RegisterForm, email: event.target.value });
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
  axios.post('https://httpbin.org/anything',RegisterForm)
  .then((Response)=>{
    if(Response.data.code === 200){
      cookies.set('RegisCookie',Response.data.token)
      alert(Response.data.token);
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
                  type='text'
                  className={"loginpageField"}
                  placeholder="1234@Gmail.com"                  
                  onChange = {(e) => onChangeForm('email',e)}
                />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} />
                  <input 
                    type = 'text'
                    className={"loginpageField"}
                    placeholder=""
                    onChange = {(e) => onChangeForm('nickname',e)}
                  />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} />
                  <input 
                    className={"loginpageField"}
                    type='password'
                    placeholder=""
                    
                    onChange = {(e) => onChangeForm('password',e)}
                  />
                  
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} />
                  <input 
                    className={"loginpageField"}
                    type='password'
                    placeholder=""                    
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
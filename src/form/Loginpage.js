import React, { Component } from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from "./Register";

import image32 from '../resources/image23.png';
import user from "../resources/user.svg";
import icon_eye from "../resources/icon _eye_.svg";
import logogoogle from "../resources/logogoogleg48dp.svg";


export default function Loginpage() {


const [userAcount, setuserAccount] = useState('yours@Gmail');
const [password, setPassword] = useState('');
const [submitstatus,setSubmitstatus] = useState("typing");
const [hidden, setHidden] = useState(false);
const [page, setPage] = useState("login");

if(page === 'register'){

  return <Register />
}

const placeholder = 'qqqqq';

async function HandleSubmit(e){
  setSubmitstatus("submitting login information");
  try{
    setSubmitstatus("submit success");

  }catch(e){
    setSubmitstatus('error');
  }
  
}
const chosePage = () => {
  
  if (page === "register") {
    return <Register />;
  }
};

function LoginSubmit(e){

  e.preventDefault();
  setTimeout(() =>{
    alert('${userAccount}');
  },3000);
  
  
}


function hiddenPSW(hidden){
  if(hidden === false){
    return(
    <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} onClick = {() => setHidden(true)}/>
                  <input 
                    className={"loginpageField"}
                    
                    placeholder=""
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                  />
              </div>
  )
  }
  else{
    return(
      <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} onClick = {() => setHidden(false)}/>
                  <input 
                    className={"loginpageField"}
                    type = {'password'}
                    placeholder=""
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                  />
              </div>
    )
  }
  
}

function Sendclick(){
  return(
    <div>
      <h2>{userAcount}</h2>
    </div>
  )
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
                  placeholder="1234@Gmail.com"
                  value = {userAcount}
                  onChange = {e => setuserAccount(e.target.value)}
                />
              </div>

              <div className={"FieldwithImage"}>
                  <img className={'iconEye1'} alt="" src={icon_eye} onClick = {e => hiddenPSW}/>
                  <input 
                    className={"loginpageField"}
                    type = {'password'}
                    placeholder=""
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                  />
              </div>
            
            
            

            
            <h2 className={'forgetPassword'}>forget password?</h2>

            <div className="FieldwithImage">
              <button className={'loginWrapper'}
                      onClick = {LoginSubmit}
                >login</button>
            </div>

            <div className="FieldwithImage">
              
                <button className={'loginWrapper'}
                        onClick = {() => {setPage("register")}}
                  >register</button>  
              
              
            </div>

            
            <button className={'officialButtonsSignInWit1'}>
                <img className={'logoGoogleg48dp1'} alt="" src={logogoogle} />
                <div className={'signInWith1'}>Sign in with Google</div>
            </button>

        </div>
  )

} 
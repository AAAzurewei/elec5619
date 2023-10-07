import React, { Component } from "react";
import { useState } from 'react';

import image32 from '../resources/image23.png';
import user from "../resources/user.svg";
import icon_eye from "../resources/icon _eye_.svg";
import logogoogle from "../resources/logogoogleg48dp.svg";


export default function Loginpage() {


const [userAcount, setuserAccount] = useState('yours@Gmail');
const [password, setPassword] = useState('');

function loginSubmit(e){

  e.preventDefault();
  setTimeout(() =>{
    alert('you submit a login request, account is ${userAcount} and password is ${password}');
  },1000);
  
}


  return(
    <div onSubmit = {loginSubmit} className={"image23Parent"}>
            
            <img className={"image23Icon"} alt="" src={image32} />
            
            <div className={"FieldwithImage"}>
              <img className={'userIcon1'} alt="" src={user} />
              <input 
                className={"loginpageField"}
                placeholder="1234@Gmail.com"
                value = {userAcount}
                onChange = {e => setuserAccount(e.target.value)}
              />
            </div>

            <div className={"FieldwithImage"}>
                <img className={'iconEye1'} alt="" src={icon_eye} />
                <input 
                  className={"loginpageField"}
                  placeholder=""
                  value = {password}
                  onChange = {e => setPassword(e.target.value)}
                />
            </div>

            
            <h2 className={'forgetPassword'}>forget password?</h2>

            <div className="FieldwithImage">
              <button 
                onClick={loginSubmit}>send</button>
            </div>

            <div className={'loginbuttonlogin'}>
                <button variant="contained" className={'loginWrapper'}>
                    <div className={'login'}>login</div>
                </button>
            </div>
            
            <div className={'loginbuttonlogin1'}>
                <button className={'loginWrapper'}>
                    <div className={'login'}>register</div>
                </button>
            </div>
            <button className={'officialButtonsSignInWit1'}>
                <img className={'logoGoogleg48dp1'} alt="" src={logogoogle} />
                <div className={'signInWith1'}>Sign in with Google</div>
            </button>

        </div>
  )

} 
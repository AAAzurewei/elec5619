import image32 from './resources/image23.png';
import user from "./resources/user.svg";
import icon_eye from "./resources/icon _eye_.svg";
import logogoogle from "./resources/logogoogleg48dp.svg";

import './App.css';


function App() {
    return (
        <div className={"image23Parent"}>
            <img className={"image23Icon"} alt="" src={image32} />
            <div className={'username'}>
                <div className={'username1'}>
                    <div className={'username2'}>yours@Gmail.com</div>
                    <img className={'userIcon1'} alt="" src={user} />
                    <div className={'rectangle2'} />
                </div>
            </div>
            <div className={'input'}>
                <div className={'input'}>
                    <div className={'username'}>
                        <div className={'password'}>password</div>
                        <img className={'iconEye1'} alt="" src={icon_eye} />
                        <div className={'rectangle2'} />
                    </div>
                </div>
            </div>
            <div className={'forgetPassword'}>forget password?</div>
            <div className={'loginbuttonlogin'}>
                <div className={'loginWrapper'}>
                    <div className={'login'}>login</div>
                </div>
            </div>
            <div className={'loginbuttonlogin1'}>
                <div className={'loginWrapper'}>
                    <div className={'login'}>register</div>
                </div>
            </div>
            <div className={'officialButtonsSignInWit1'}>
                <img className={'logoGoogleg48dp1'} alt="" src={logogoogle} />
                <div className={'signInWith1'}>Sign in with Google</div>
            </div>

        </div>);
};

export default App;
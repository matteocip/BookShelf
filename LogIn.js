import React, { useEffect, useState } from 'react';
import Input from "./Input";

export default function LogIn(props) {
    const [password, setPassword] = useState('');
    const [div, setDiv] = useState(false);

    useEffect(() => props.call(),[])

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const testPassword = () => {
        let truePass = props.info.password;
        if (password === truePass) {
           props.onClickLogIn();
        }else {
            setDiv(true);
            setTimeout(() => setDiv(false), 3000);
        }
    }

    return(
    <>
    <div>
        <header className='header'>
            <div className='divHeader'>
                <div className='divLeft'> <h2>BookShelf</h2> </div>
            </div>
            <div className='divHeaderFooter'>
                <div className="divAccountsButton" onClick={props.onClick} ><span>Accounts</span></div>
                <div className='divScritta'><span>Your virtual library</span></div>
            </div>
        </header>
        <div className="bodyPageLogIn">
            <span>Enter your password account:</span>
            <Input className='inputPageLogIn' type={'password'} placeholder='Password' onChange={handleChange} />
            <div className="buttonLogIn" onClick={testPassword} ><span>Login</span></div>
        </div>
        <footer className='footer'>
            <div className='divFooter'></div>
        </footer>
        {div && <div className="divMessaggioPasswordSbagliata"><div className="messaggioPasswordSbagliata">Wrong password entered !!</div></div>}
    </div>
    </>
    )
}
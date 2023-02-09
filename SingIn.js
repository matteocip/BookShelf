import React, { useState } from 'react';
import Input from "./Input";

export default function SingIn(props) {
    const [user, setUser] = useState(['', '', '', '', '', '']);
    const [verify, setVerify] = useState(false);
    const [infoUsers, setInfoUsers] = useState(props.infoUsers);

    const handleChange = (index, e) => {
        e = window.event;
        let arr = user.map(x => x);
        arr[index] = e.target.value;
        setUser(arr);
    }

    const verifyInput = () => {
        setVerify(true);
        setTimeout(() => setVerify(false), 5000)
    }

    const divAlert = (index) => {
        if (index === 0 && user[0] === '') return [<div className="divAlert">Email Required</div>]            
        if (index === 0) {
            for(let i = 0; i < infoUsers.length; i++) {
                if (user[0] === infoUsers[i].email) return [<div className="divAlert">Email Already exist</div>]            
            }
        }   
        if(index === 1 && user[1] === '') return [<div className="divAlert">Name Required</div>]
        if(index === 2 && user[2] === '') return [<div className="divAlert">Surname Required</div>]
        if(index === 3 && user[3] === '') return [<div className="divAlert">Phone Required</div>]
        if(index === 4 && user[4] === '') return [<div className="divAlert">Password Required</div>]
        if(index === 5 && user[5] !== user[4]) return [<div className="divAlert">Confirm password</div>]
        if(index === 6 && infoUsers.length === 9) return [<div className="divAlert">Accounts limit reached</div>]
    }

    const createAccount = async () => {
        let ok = 0;
        if(infoUsers.length === 9) ok = 1;
        for(let i = 0; i < user.length; i++) {
            if (user[i] === '') ok = 1; 
        }
        if(user[4] !== user[5]) ok = 1;
        for(let i = 0; i < infoUsers.length; i++) {
            if(user[0] === infoUsers[i].email) ok = 1;
        }
        if(ok === 1) return;
        let userDatas = {
            email: user[0],
            name: user[1],
            surname: user[2],
            phone: user[3],
            password: user[4]
        }
        fetch('http://localhost:8080/user', {
            method: 'POST',
            body:JSON.stringify(userDatas),
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        })
        .then(() => props.call());
        props.onClick();
    }

    return(
    <>
    <div className="divContainerPageSingIn">
        <header className='header'>
            <div className='divHeader'>
                <div className='divLeft'> <h2>BookShelf</h2> </div>
            </div>
            <div className='divHeaderFooter'>
                <div className="divAccountsButton" onClick={props.onClick} ><span>Accounts</span></div>
                <div className='divScritta'><span>Your virtual library</span></div>
            </div>
        </header>
        <div className="bodyPageSingIn">
            {verify ? divAlert(6) : null}
            <span className="spanTiltePageSingIn">Insert your credentials:</span>
            <span>E-mail:</span>
            <Input className='input' placeholder={'E-mail'} onChange={() => handleChange(0)} />
            {verify ? divAlert(0) : null}
            <span>Name:</span>
            <Input className='input' placeholder={'Name'} onChange={() => handleChange(1)} />
            {verify ? divAlert(1) : null}
            <span>Surname:</span>
            <Input className='input' placeholder={'Surname'} onChange={() => handleChange(2)} />
            {verify ? divAlert(2) : null}
            <span>Phone:</span>
            <Input className='input' placeholder={'Phone'} onChange={() => handleChange(3)} />
            {verify ? divAlert(3) : null}
            <br></br>
            <span>Password:</span>
            <Input className='input' placeholder={'Password'} type={'password'} onChange={() => handleChange(4)} />
            {verify ? divAlert(4) : null}
            <span>Confirm password:</span>
            <Input className='input' placeholder={'Password'} type={'password'} onChange={() => handleChange(5)}/>
            {verify ? divAlert(5) : null}
            <div className="buttonSingIn" onClick={() => { 
                    createAccount();
                    verifyInput();
                }}><span>Singin</span></div>
        </div>
    </div>
    </>
    )
}
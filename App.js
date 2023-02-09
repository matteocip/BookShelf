import React, { useEffect, useState } from 'react';
import BoxAccount from './BoxAccount';
import LogIn from './LogIn';
import SingIn from './SingIn';
import Account from './Account';

export default function App() {
  const [logIn, setLogIn] = useState(false);
  const [singIn, setSingIn] = useState(false);
  const [account, setAccount] = useState(false);
  const [infoUsers, setInfoUsers] = useState([]);
  const [info, setInfo] = useState({});

  const call = () => {
    fetch('http://localhost:8080/user')
    .then(res => res.json())
    .then(data => setInfoUsers(data))
  }

  useEffect(() => call(),[]);

  const boxAccounts = () => {
    let arr = [];
    for(let i = 0; i < infoUsers.length; i++){
      arr.push(<BoxAccount key={i} onClick={() => {
        setLogIn(!logIn);
        setInfo(infoUsers[i]);
      }} name={infoUsers[i].name}/>)
    }
    if(arr.length === 0) return (
    <div className='createYourAcoountFirstTime'> 
      <h1>Create your account !</h1>
      <div className='buttonCreateYourAccount' onClick={() => setSingIn(!singIn)} >SingIn</div>
    </div>
    )
    return arr;
  }

  return (
    <>
    {account && <Account onClick={() =>  setAccount(!account)} info={info} call={() => call()}/>}
    {logIn && <LogIn onClick={() => setLogIn(!logIn)} call={() => call()} onClickLogIn={
      () => {
        setAccount(!account);
        setLogIn(!logIn);
      }} info={info}/>}
    {singIn && <SingIn onClick={() => setSingIn(!singIn)} call={() => call()} infoUsers={infoUsers} />}
    {logIn || singIn || account ? null :
    <div>
      <header className='header'>
        <div className='divHeader'>
          <div className='divLeft'><h2>BookShelf</h2></div>
        </div>
        <div className='divHeaderFooter'>
          <div className='divScritta'><span>Your virtual library</span></div>
          <div className='divSingInButton' onClick={() => setSingIn(!singIn)}><span>SingIn</span></div>
        </div>
      </header>
      <div className='divContainerBoxAccounts'>
        <div id='divBoxAccounts'>
          {boxAccounts()}
        </div>  
      </div>
      <footer className='footer'>
        <div className='divFooter'>
        </div>
      </footer>
    </div>}
    </>
  );
}
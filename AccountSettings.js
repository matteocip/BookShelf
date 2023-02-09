import React, { useState } from 'react';
import Input from "./Input";

export default function AccountSettings(props) {
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [verify, setVerify] = useState(false);
    const [datas, setDatas] = useState([
        props.info.utente_id,
        props.info.email,
        props.info.name,
        props.info.surname,
        props.info.phone,
        props.info.password,
        ''
    ]);

    const handleChange = (index, e) => {
        e = window.event;
        if(index === 5 && e.target.value === '') {
            let arr = datas.map(x => x);
            arr[5] = props.info.password;
            setDatas(arr);
        }else{
        let arr = datas.map(x => x);
        arr[index] = e.target.value;
        setDatas(arr);
        }
    }

    const verifyInput = () => {
        setVerify(true);
        setTimeout(() => setVerify(false), 5000)
    }

    const divAlert = (index) => {
        if (index === 1 && datas[1] === '') return [<div className="divAlert">Email Required</div>]            
        if (index === 2 && datas[2] === '') return [<div className="divAlert">Name Required</div>]            
        if (index === 3 && datas[3] === '') return [<div className="divAlert">Surname Required</div>]            
        if (index === 4 && datas[4] === '') return [<div className="divAlert">Phone number Required</div>]            
        if (index === 5 && datas[5] === props.info.password && datas[6] !== '') return [<div className="divAlert">Insert password</div>]            
        if (index === 6 && datas[5] !== props.info.password && datas[6] !== datas[5]) return [<div className="divAlert">Confirm password</div>]
    }

    const modifyFetch = () => {
        let ok = 0;
        for(let i = 0; i < datas.length -1; i++) {
            if(datas[i] === '') ok = 1;
        }
        if(datas[5] !== props.info.password && datas[6] !== datas[5]) ok = 1;
        if(datas[5] === props.info.password && datas[6] !== '') ok = 1;
        if (ok === 1) return
        let accountUpdated = {
            utente_id: datas[0],
            email: datas[1],
            name: datas[2],
            surname: datas[3],
            phone: datas[4],
            password: datas[5]
        }
        fetch('http://localhost:8080/user', {
            method: 'PUT',
            body:JSON.stringify(accountUpdated),
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then(props.call())
        .then(props.backToAccesPage());
    }

    const deleteFetch = () => {
        fetch('http://localhost:8080/user/'+props.info.utente_id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then(() => props.call());
        props.backToAccesPage();
    }

    return(
        <>
        <div className="containerAccountSettings">
            <header className='header'>
                <div className='divHeader'>
                    <div className='divLeft'> <h2>BookShelf</h2> </div>
                </div>
                <div className='divHeaderFooter'>
                    <div className="divAccountsButton" onClick={() => props.back()} ><span>Back to account</span></div>
                    <div className='divScritta' onClick={() => console.log(datas[5])} ><span>Your virtual library</span></div>
                    <div className="divDeleteAccountsButton" onClick={() => setModalConfirmDelete(true)} ><span>Delete account</span></div>
                </div>
            </header>
            <div className="bodyPageSingIn">
                <span className="spanTiltePageSingIn" >Account settings:</span>
                <span>E-mail:</span>
                <Input className='input' placeholder={'E-mail'} value={datas[1]} onChange={() => handleChange(1)} />
                {verify ? divAlert(1) : null}
                <span>Name:</span>
                <Input className='input' placeholder={'Name'}value={datas[2]} onChange={() => handleChange(2)}/>
                {verify ? divAlert(2) : null}
                <span>Surname:</span>
                <Input className='input' placeholder={'Surname'}value={datas[3]} onChange={() => handleChange(3)}/>
                {verify ? divAlert(3) : null}
                <span>Phone:</span>
                <Input className='input' placeholder={'Phone'}value={datas[4]} onChange={() => handleChange(4)}/>
                {verify ? divAlert(4) : null}
                <br></br>
                <span>Change password:</span>
                <Input className='input' placeholder={'Password'} type={'password'} onChange={() => handleChange(5)}/>
                {verify ? divAlert(5) : null}
                <span>Confirm password:</span>
                <Input className='input' placeholder={'Password'} type={'password'} onChange={() => handleChange(6)}/>
                {verify ? divAlert(6) : null}
                <div className="buttonConfirm" onClick={() => { 
                    modifyFetch();
                    verifyInput();
                }} ><span>Confirm</span></div>
            </div>       
        </div>
        {modalConfirmDelete &&
            <div className="divModalConfirm">
                <div className="modalConfirm"> 
                    <span className="scrittaModalConfirm">Delete account ?</span>
                    <div className="divYesNo">
                        <div className="buttonYesNo" onClick={deleteFetch}>Yes</div>
                        <div className="buttonYesNo" onClick={() => setModalConfirmDelete(false)}>No</div>
                    </div>
                </div>
            </div>}
        </>
    )
}
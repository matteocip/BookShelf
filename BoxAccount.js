import React from 'react';

export default function BoxAccount(props) {

    const firstLetter = () => {
        let name = props.name;
        let letter = name.toUpperCase().split("");
        return letter[0];
    }

    return(
        <div className='divBoxAccounts'>
            <div className='boxAccountImg' onClick={props.onClick}>
                {firstLetter()}
            </div>
            <div className='boxAccountName'>
                <h4>{props.name}</h4>
            </div>   
        </div>
    )
}
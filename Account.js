import React, { useEffect, useState } from 'react';
import Input from "./Input";
import Modal from "./Modal";
import ModalAdd from './ModalAdd';
import AccountSettings from "./AccountSettings";

export default function Account(props) {
  const [books, setBooks] = useState([]);
  const [infoBook, setInfoBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [accountSettings, setAccountSettings] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [reverse, setReverse] = useState(false);
 
  useEffect(() => {call()},[]);

  const call = () => {
    fetch('http://localhost:8080/books/book/'+props.info.utente_id, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resJSON => {
      setBooks(sortFunction(resJSON));
      setBookList(sortFunction(resJSON));
    });
  }

  const sortFunction = (list) => {
    let arr = list.map(x => x);
    return arr.sort(function (a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    })
  }

  const sortFunctionReverse = (list) => {
    let arr = list.map(x => x);
    return arr.sort(function (a, b) {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    })
  }

  const buttonSort = () => {
    if(reverse === false){
      setBookList(sortFunctionReverse(bookList));
      setReverse(true);
    }else{
      setBookList(sortFunction(bookList));
      setReverse(false);
    }
  }

  const handleChange = e => {
    let arr = books.map(x => "");
    if(e.target.value === "") {
      call();
    }
    for(let index = 0; index < books.length; index++) {
      let bookTitle = books[index].title.toUpperCase().split("");
      let letter = e.target.value;
      let letters = letter.toUpperCase().split("");
      for(let i = 0; i < letters.length; i++) {
        if(letters[i] !== bookTitle[i]) {arr[index] = ""; break};
        if(letters[i] === " ") continue
        if(letters[i] === bookTitle[i]) {
          let titleB = "";
          for(let y = 0; y < bookTitle.length; y++){
            titleB = titleB + bookTitle[y];
          }
          arr[index] = titleB;
        }
      }
    }
    let array = [];
    for(let z = 0; z < arr.length; z++) {
      if(arr[z] === '') continue
      array.push(books[z]);
    }
    setBookList(array);
  }

  return(
    <>
    {modal && <Modal onClick={() => setModal(false)} info={infoBook} back={() => setModal(false)} call={() => call()} />}
    {modalAdd && <ModalAdd onClick={() => setModalAdd(false)} info={infoBook} utente_id={props.info.utente_id} back={() => setModalAdd(false)} call={() => call()}/>}
    {accountSettings && <AccountSettings back={() => setAccountSettings(false)}
      backToAccesPage={() => {
        setAccountSettings(false);
        props.onClick();
      }}
      call={() => {
        props.call();
      }} info={props.info}/>}
    {accountSettings ? null : 
    <div className="divContainerAccount">
      <header className='headerAccount'>
        <div className='divHeaderAccount'>
          <div className="divLeftAccount">
            <div className="spanBookShelf">BookShelf</div>
          </div>
          <div className='divCenterAccount'>
            <Input className='inputSearchBooks' placeholder={'Search'+' in '+bookList.length+' titles..'} onChange={handleChange}/>
            <div className="divMagnifyingLens">S</div>         
          </div>
          <div className="divRightAccount"></div>
        </div>
        <div className='divHeaderFooterAccount'>
        <div className='settingsButton' onClick={() => setAccountSettings(true) } ><span>Account settings</span></div>
          <div className='divScritta'><span>{props.info.name} {props.info.surname}</span></div>
          <div className='exitButton'onClick={() => setModalConfirm(true)}><span>Exit</span></div>
        </div>
      </header>
      <div className="containerBodyAccount">
        <div className="bodyLeftAccount">
          Coming soon
        </div>
        <div className="divBodyAccount">
          <div className="divButtonAddBook">
            <div className="buttonAddBook" onClick={() => setModalAdd(true)} >Add Book</div>
            <div className="buttonSort" onClick={buttonSort} >{reverse ? <span> Z - A</span> : <span> A - Z</span>}</div>
          </div>
          <div>{bookList.map(book => <div className="titleBook" key={book.book_id} onClick={() => {
            setModal(true);
            setInfoBook(book);
            }} >{book.title}</div>)}
          </div>
        </div>
        <div className="bodyRigthAccount">
          Coming soon
        </div>
      </div>
    </div>}
    {modalConfirm &&
      <div className="divModalConfirm">
        <div className="modalConfirm"> 
          <span className="scrittaModalConfirm">Log out of account ?</span>
          <div className="divYesNo">
            <div className="buttonYesNo" onClick={props.onClick}>Yes</div>
            <div className="buttonYesNo" onClick={() => setModalConfirm(false)}>No</div>
          </div>
        </div>
      </div>}
    </>
  )
}
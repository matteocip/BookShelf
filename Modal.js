import React, { useState } from 'react';

export default function Modal(props) {
  const [book, setBook] = useState([props.info.title, props.info.description, props.info.language]);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

  const handleChange = (index, e) => {
    e = window.event;
    let arr = book.map(x => x);
    arr[index] = e.target.value;
    setBook(arr);
  }

  const modifyFetch = () => {
    let bookUpdated = {
      book_id: props.info.book_id,
      title: book[0],
      description: book[1],
      language: book[2]
    }
    fetch('http://localhost:8080/books/book', {
      method: 'PUT',
      body:JSON.stringify(bookUpdated),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      }
    }).then(() => props.call());
    props.back();
  }

  const deleteFetch = () => {
    fetch('http://localhost:8080/books/book/'+props.info.book_id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
      }
    })
    .then(() => props.call());
    props.back();
  }

  return (
    <>
    <div className="modalBackGround">
      <div className="modal">
        <div className="modalTitle">
          <input className="inputTitleModale" value={book[0]} onChange={() => handleChange(0)} ></input>
        </div>
        <div className="scrittaDescriptionModale">
          <span className="scrittaModale">Description:</span>
        </div>
        <div className="modalBody">  
          <textarea className="textAreaModale" value={book[1]} onChange={() => handleChange(1)}></textarea>
        </div>
        <div className="divLanguageModale">
          <span className="scrittaModale">
            Language:
          </span>
          <select className="selectModale" value={book[2]} onChange={() => handleChange(2)}>
            <option value='Italiano'>Italian</option>
            <option value='English'>English</option>
            <option value='Chinese'>Chinese</option>
            <option value='Arabic'>Arabic</option>
            <option value='español'>español</option>
            <option value='French'>French</option>
            <option value='German'>German</option>
          </select>
        </div>
        <div className="footerModale">
          <div className="divButtonDelete"><div className="buttonDeleteBook" onClick={() => setModalConfirmDelete(true)}>Delete Book</div></div>
          <div className="divButtonModify"><div className="buttonModifyModal" onClick={() => modifyFetch()} >Modify</div></div>
          <div className="divButtonClose"><div className="buttonCloseModal" onClick={props.onClick}>Close</div></div>
        </div>
      </div>
    </div>
    {modalConfirmDelete &&
      <div className="divModalConfirm">
        <div className="modalConfirm"> 
          <span className="scrittaModalConfirm">Delete the book ?</span>
          <div className="divYesNo">
            <div className="buttonYesNo" onClick={() => deleteFetch()}>Yes</div>
            <div className="buttonYesNo" onClick={() => setModalConfirmDelete(false)}>No</div>
          </div>
        </div>
      </div>}
    </>
  );
}
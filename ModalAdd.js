import React, { useState } from "react";

export default function Modal(props) {
    const [datas, setDatas] = useState(["", "", "Italiano"])

    const handleChange = (index, e) => {
        e = window.event;
        let arr = datas.map(x => x);
        arr[index] = e.target.value;
        setDatas(arr);
    }

    const addBook = () => {
      let ok = 0;
      if(datas[0] === "" ) {
        alert('The book needs at least one title');
        ok = 1;
      }
      //Uso questo algoritmo nel caso in cui voglio 
      //che venga inserita obbligatoriamente una descrizione del libro .
      /*for(let i = 0; i < datas.length; i++){
        if(datas[i] !== "") {continue}else{
          alert('Book needs Title and Description'); 
          ok = 1;
          break;
        }
      }*/
      if(ok) return;
      let bodyFetch = {
        title: datas[0],
        description: datas[1],
        language: datas[2]
      }
      fetch('http://localhost:8080/books/book/'+props.utente_id, {
        method: 'POST',
        body:JSON.stringify(bodyFetch),
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        }
      }).then(() => props.call())
      props.back();
    }

  return (
    <div className="modalBackGround">
      <div className="modal">
        <div className="modalTitle">
          <input className="inputTitleModale" placeholder="Title" onChange={() => handleChange(0)} value={datas[0]}></input>
        </div>
        <div className="scrittaDescriptionModale">
          <span className="scrittaModale">Description:</span>
        </div>
        <div className="modalBody">  
          <textarea className="textAreaModale" onChange={() => handleChange(1)} value={datas[1]}></textarea>
        </div>
        <div className="divLanguageModale">
          <span className="scrittaModale">Language:</span>
          <select className="selectModale" onChange={() => handleChange(2)} value={datas[2]} >
          <option value='Italiano'>Italian</option>
            <option value='English'>English</option>
            <option value='Chinese'>Chinese</option>
            <option value='Arabic'>Arabic</option>
            <option value='español'>español</option>
            <option value='French'>French</option>
            <option value='German'>German</option>
          </select>
        </div>
        <div className="footerModalAdd">
          <div className="divButtonAdd"><div className="buttonAddModal" onClick={addBook} >Add</div></div>
          <div className="divButtonClose"><div className="buttonCloseModal" onClick={props.onClick} >Close</div></div>
        </div>
      </div>       
    </div>
  );
}
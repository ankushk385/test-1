import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const url = 'http://localhost:3333';

  const getData = async ()=>{
    
  axios.get(url+'/item/listall').then((data)=>setData(data?.data?.result))    
  }

  useEffect(() => {

    getData();

  }, [])

  const deleteItem = (id)=>{
    axios.delete(url+"/item/delete/" + id).then((res) =>
    console.log(res)
  );
  }

  const addItem = (e)=>{
    
    e.preventDefault();

    let data = {
      id: Math.floor(Math.random() * 1000),
      itemName,
      itemPrice
    };

    axios.post(url+"/item/add", data).then((res) => {
      console.log(res);
    });

    setItemName("");
    setItemPrice("");

  }
  
  return (
    <>
    <div className="container">
      <div className="list-container">
        <ul className="item-list">
       { data.map((item)=>(
         <li key={item.itemId}>
          <h3>{item.item}</h3>
          <button onClick={()=>{
          deleteItem(item.itemId);
        }} >Delete</button>
           </li>
        ))}
        </ul>
      </div>

      <div className="list-add">
      <input
            type="text"
            placeholder="item name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
          <input
            type="text"
            placeholder="item price"
            value={itemPrice}
            onChange={(event) => setItemPrice(event.target.value)}
          />
          <button disabled={!itemPrice || !itemName} onClick={addItem}>
            Add Item
          </button>
      </div>
      
    </div>
    </>
  );

      }
export default App;

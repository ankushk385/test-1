import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from "react-modal";

function App() {
  const [data, setData] = useState([])
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showName, setShowName] = useState("")
  const [showPrice, setShowPrice] = useState("")

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

  const showItem = (name,price)=>{
    setShowName(name)
    setShowPrice(price);
   setOpenModal(true)
  }
  const closeModal = ()=>{
    setOpenModal(false)
   }
  const addItem = (e)=>{
    
    e.preventDefault();

    let data = {
      itemId: Math.floor(Math.random() * 1000),
      item:itemName,
      price:itemPrice
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
          <button className="del" onClick={()=>{
          deleteItem(item.itemId);
        }} >Delete</button>
         <button onClick={()=>{
          showItem(item.item,item.price);
        }} >show details</button>
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

      <Modal
            isOpen={openModal}
            ariaHideApp={false}
            className="mymodal"
            overlayClassName="myoverlay"
          >
            <label htmlFor="">item name</label>
            <h5>{showName}</h5>
            <label htmlFor="">item price</label>
            <h5>{showPrice}</h5>
            <button onClick={closeModal}>close</button>
          </Modal>
    </div>
    </>
  );

      }
export default App;

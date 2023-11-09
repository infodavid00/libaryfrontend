import React, { useState, useEffect } from 'react';
import '../App.css'
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import {useParams} from 'react-router-dom'
import { X } from 'react-feather';
import {endpoint} from '../utils/Config'
import axios from 'axios';
import Loader from '../utils/Loader'


function Details() {
  const {id} = useParams()
  const [isModal, setModal] = useState(false)
  const [data, setdata] = useState(false);
  const [uid, setid] = useState(false);
  const [isloading, setisloading] = useState(true);
  const signature = () => {
    const sign = localStorage.getItem('signature');
    return sign !== null ? JSON.parse(sign).signature : null;
  };


    useEffect(() => {
    const fetchData = async () => {
      setisloading(true)
      if (signature() !== null) {
        try {
          const url = endpoint + 'books/byid/' + id ;
          const profileurl = endpoint + 'user/' + signature();
          const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' }
          });
          const profileresponse = await axios.get(profileurl, {
            headers: { 'Content-Type': 'application/json' }
          });
          setdata(response.data.data);
          setid(profileresponse.data.data);
          setisloading(false)
        } catch (err) {
          setid(null)
          setdata(null);
          setisloading(false)
        }      
     } else {
        setdata(false)
        setisloading(false)
        window.location.href = '/signin'
      }
    };

    fetchData();
  }, []); 

  function ifborrowedorfinished(){
    if (uid !== null && data !== null && data.quantity !== 0) {
      let x;
      data.borrowed.forEach(current => {
        if (current.sub === uid._id) {
          x = true
        }
      })
      if (x === true) {
        return true 
      }
      else {
        return false
      }
    }
    else {
      return true
    }
  }


  async function handleBorrowbook(data) {
    try {
      setisloading(true)
      const url = endpoint+'borrowbook/' + signature() + '/' + id;
      const response = await axios.post(url, data, {
       headers: {'Content-Type': 'application/json'}})
      const rs = response.data
      if (rs.acknowledged === true) {
      window.location.reload()
      }
      else {
        setisloading(false)
      }
      } catch (err) {
        setisloading(false)
        } finally {
          // setisloading(false)
        }
  }

  function Modal({back, data}) {
   const [datevalue, setdatevalue] = useState('')
   const handledatechange = (e) => setdatevalue(e.target.value)
    let schema = {
      email : data.email,
      name : data.username,
      sub : data._id,
      date : datevalue
    }
   return (
   <div className='modal'>
   <X width={22} onClick={()=> back()} strokeWidth={1} color={'white'} style={{marginTop:'2em', marginLeft:'20px'}} />
    <div className='auth-board modal-cont' style={{transform:'translateY(25%)'}}>
     <h2>Borrow Book</h2>
     <input type='email' value={data.email || null} disabled/>
     <input type='text' placeholder={data.username || null} disabled/>
     <input type='date' placeholder='return date' value={datevalue} onChange={handledatechange}/>
     <button onClick={()=> handleBorrowbook(schema)}>Submit</button>
    </div>
   </div>
 )
}


  return (
    <>
    {isloading === true ? <Loader /> : null}
    {isModal === true ? <Modal back={()=> setModal(false)} data={uid} /> : null}
    <Header active={'home'} />
    <section className='app-afterHeader app-container-fit'>
     {isloading === false ? (
        <>
        {uid === null && data === null ? null : uid === null && data === false ? null : (
        <div className='details' style={{marginTop:'6em'}}> 
        <div className='details-card-poster' style={{backgroundImage: `url(${data.imageurl})`}}> {/* relevant image */} </div> 
        <h3>{data.bookname}</h3>
        <p>{data.shortdescription}</p>
        <p style={{textAlign:'left', width:'100%'}}>{data.bookquantity} books available</p>
        <div >
        <button style={{backgroundColor:'#222', color:'white'}} onClick={()=> window.location.reload()}> {'Read book'}</button>  {/* see content of the book */}
        {ifborrowedorfinished() === true ? null : <button style={{backgroundColor:'#222', color:'white'}} onClick={()=> (setModal(true))}> {'Borrow book'}</button>
        }
        </div>
        </div>
        )}
        </>
       ) : null}
    </section>
    <Footer />
    </>
  )
  
}
// 

export default Details


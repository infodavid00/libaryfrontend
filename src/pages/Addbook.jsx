import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { endpoint } from '../utils/Config';
import Loader from '../utils/Loader';
import Header from '../utils/Header';

function Addbook() {
  const [isuser, setisuser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sign = localStorage.getItem('signature');
      if (sign !== null) {
        setisuser(true);
      } else {
        setisuser(false);
      }
    };

    fetchData();
  }, []);

  const [image, setimagevalue] = useState('');
  const [bookname, setbooknamevalue] = useState('');
  const handleimagechange = (e) => setimagevalue(e.target.value);
  const handlebooknamechange = (e) => setbooknamevalue(e.target.value);
  const [bookquantity, setbookquantityvalue] = useState('');
  const [ratings, setratingsvalue] = useState('');
  const handlebookquantitychange = (e) => setbookquantityvalue(e.target.value);
  const handleratingschange = (e) => setratingsvalue(e.target.value);
  const [authorname, setauthornamevalue] = useState('');
  const [category, setcategoryvalue] = useState('');
  const handleauthornamechange = (e) => setauthornamevalue(e.target.value);
  const handlecategorychange = (e) => setcategoryvalue(e.target.value);
  const [shortdescription, setshortdescriptionvalue] = useState('');
  const handleshortdescriptionchange = (e) => setshortdescriptionvalue(e.target.value);

  const bookscheme = {
    image,
    bookname,
    bookquantity,
    ratings,
    authorname,
    category,
    shortdescription,
  };
  const [isloading, setisloading] = useState(false);

  async function handleUpload(data) {
    try {
      setisloading(true);
      const url = endpoint + 'addbook';
      console.log(url);
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      const rs = response.data;
      if (rs.acknowledged === true) {
        window.location.href = '/';
      } else {
        setisloading(false);
      }
    } catch (err) {
      setisloading(false);
    } finally {
      // setisloading(false)
    }
  }

  return (
    <>
      {isloading === true ? <Loader /> : null}
      <Header active={'addbook'} />
      {isuser === true ? (
        <div className='auth-board' style={{ transform: 'translateY(10%)' }}>
          <h2>Add book</h2>
          <input type='url' placeholder='image uri' value={image} onChange={handleimagechange} />
          <input type='text' placeholder='book name' value={bookname} onChange={handlebooknamechange} maxLength={40} />
          <input type='number' placeholder='book quantity' value={bookquantity} onChange={handlebookquantitychange} maxLength={5} />
          <input type='number' placeholder='ratings' value={ratings} onChange={handleratingschange} maxLength={5} />
          <input type='text' placeholder='author name' value={authorname} onChange={handleauthornamechange} maxLength={40} />
          <input type='text' placeholder='category' value={category} onChange={handlecategorychange} maxLength={25} />
          <textarea placeholder='short description' value={shortdescription} onChange={handleshortdescriptionchange} maxLength={2000}></textarea>

          <button onClick={() => handleUpload(bookscheme)}>Add book</button>
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </>
  );
}

export default Addbook;

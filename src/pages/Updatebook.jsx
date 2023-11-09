import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import Header from '../utils/Header';
import axios from 'axios';
import { endpoint } from '../utils/Config';
import Loader from '../utils/Loader';

function Updatebook() {
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

  const { id } = useParams();

  const [image, setimagevalue] = useState('');
  const [bookname, setbooknamevalue] = useState('');
  const handleimagechange = (e) => setimagevalue(e.target.value);
  const handlebooknamechange = (e) => setbooknamevalue(e.target.value);
  const [ratings, setratingsvalue] = useState('');
  const handleratingschange = (e) => setratingsvalue(e.target.value);
  const [authorname, setauthornamevalue] = useState('');
  const [category, setcategoryvalue] = useState('');
  const handleauthornamechange = (e) => setauthornamevalue(e.target.value);
  const handlecategorychange = (e) => setcategoryvalue(e.target.value);

  const bookscheme = {
    image,
    bookname,
    ratings,
    authorname,
    category,
  };
  const [isloading, setisloading] = useState(false);

  async function handleUpdate(data) {
    try {
      setisloading(true);
      const url = endpoint + 'updatebook/' + id;
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      const rs = response.data;
      if (rs.acknowledged === true) {
        window.location.href = '/allbooks';
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
      <Header active={'home'} />
      {isuser === true ? (
        <div className='auth-board' style={{ transform: 'translateY(20%)' }}>
          <h2>Update book</h2>
          <input type='url' placeholder='image uri' value={image} onChange={handleimagechange} />
          <input type='text' placeholder='book name' value={bookname} onChange={handlebooknamechange} maxLength={40} />
          <input type='number' placeholder='ratings' value={ratings} onChange={handleratingschange} maxLength={5} />
          <input type='text' placeholder='author name' value={authorname} onChange={handleauthornamechange} maxLength={40} />
          <input type='text' placeholder='category' value={category} onChange={handlecategorychange} maxLength={25} />
          {/*  */}
          <button onClick={() => handleUpdate(bookscheme)}>Submit</button>
        </div>
      ) : (
        () => {
          window.location.href = '/signin';
          return null;
        }
      )}
    </>
  );
}

export default Updatebook;

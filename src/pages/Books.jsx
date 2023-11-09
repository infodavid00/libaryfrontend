import React, { useState, useEffect } from 'react';
import Loader from '../utils/Loader';
import '../App.css';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import Card from '../components/Card';
import { endpoint } from '../utils/Config';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Books() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState(null);
  const [isloading, setisloading] = useState(true);

  const signature = () => {
    const sign = localStorage.getItem('signature');
    return sign !== null ? JSON.parse(sign).signature : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setisloading(true);

      if (signature() !== null) {
        try {
          const url = endpoint + 'books?where=' + category;
          const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          setdata(response.data.data);
          setisloading(false);
        } catch (err) {
          console.error(err);
          setdata(null);
          setisloading(false);
        }
      } else {
        setdata(false);
        setisloading(false);
        navigate('/signin');
      }
    };

    fetchData();
  }, [category, navigate]);

  return (
    <>
      {isloading === true ? <Loader /> : null}
      <Header active={'home'} />
      <section className='app-afterHeader app-container-fit'>
        <h2 style={{ display: 'flex', padding: '10px', fontFamily: 'var(--fntb)' }}>{category}</h2>
        <div className='shelves'>
          {isloading === false && data !== null && data !== false ? (
            <>
              {data.map((current) => (
                <Card key={current._id} data={current} type={' '} />
              ))}
            </>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Books;

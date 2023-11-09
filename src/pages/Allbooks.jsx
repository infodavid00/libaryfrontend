import React, { useState, useEffect, useLayoutEffect } from 'react';
import Loader from '../utils/Loader';
import '../App.css';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import Card from '../components/Card';
import { endpoint } from '../utils/Config';
import axios from 'axios';

function Allbooks() {
  const [data, setdata] = useState(false);
  const [isloading, setisloading] = useState(true);

  const signature = () => {
    const sign = localStorage.getItem('signature');
    return sign !== null ? JSON.parse(sign).signature : null;
  };

  const fetchData = async () => {
    setisloading(true);
    if (signature() !== null) {
      try {
        const url = endpoint + 'books?where=all';
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
        });
        setdata(response.data.data);
        setisloading(false);
      } catch (err) {
        setdata(null);
        setisloading(false);
      }
    } else {
      setdata(false);
      setisloading(false);
      window.location.href = '/signin';
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []); 

  async function handleFilter() {
    try {
      setisloading(true);
      const url = endpoint + 'books/byavail';
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      setdata(response.data.data || []);
      setisloading(false);
    } catch (err) {
      setdata(null);
      setisloading(false);
    }
  }

  return (
    <>
      {isloading === true ? <Loader /> : null}
      <Header active={'allbooks'} />
      <section className='app-afterHeader app-container-fit'>
        <button style={{ display: 'flex', padding: '10px' }} onClick={() => handleFilter()}>
          Filter
        </button>
        <div className='shelves'>
          {isloading === false ? (
            <>
              {data === null ? null : data === false ? null : (
                <>
                  {data.map((current) => (
                    <Card key={current._id} data={current} type={'update'} />
                  ))}
                </>
              )}
            </>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Allbooks;

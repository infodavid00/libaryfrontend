// Borrowedbooks.jsx
import React, { useState, useEffect } from 'react';
import Loader from '../utils/Loader';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import Card from '../components/Card';
import { endpoint } from '../utils/Config';
import axios from 'axios';

function Borrowedbooks() {
  const [data, setdata] = useState(null);
  const [isloading, setisloading] = useState(true);

  const signature = () => {
    const sign = localStorage.getItem('signature');
    return sign !== null ? JSON.parse(sign).signature : null;
  };

  async function handlereturnbook(id) {
    try {
      setisloading(true);
      const url = endpoint + 'return/' + signature() + '/' + id;
      const response = await axios.post(url, {}, {
        headers: { 'Content-Type': 'application/json' }
      });
      const rs = response.data;
      if (rs.acknowledged === true) {
        window.location.reload();
      } else {
        setisloading(false);
      }
    } catch (err) {
      setisloading(false);
    } finally {
      // setisloading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setisloading(true);
      if (signature() !== null) {
        try {
          const url = endpoint + 'books/borrowedbooks/' + signature();
          const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          setdata(response.data.data);
          setisloading(false);
        } catch (err) {
          console.error('Error fetching borrowed books:', err);
          setdata(null);
          setisloading(false);
        }
      } else {
        setdata(false);
        setisloading(false);
        window.location.href = '/signin';
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isloading && <Loader />}
      <Header active={'borrowbook'} />
      <section className='app-afterHeader app-container-fit'>
        <div className='shelves' style={{ marginTop: '7em' }}>
          {isloading === false && data !== null && data !== false && (
            <>
              {data.map((current) => (
                <Card
                  key={current._id}
                  data={current}
                  type={'borrow'}
                  returnBookHandler={handlereturnbook} // Pass the handlereturnbook function
                />
              ))}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Borrowedbooks;

// Card.jsx
import React from 'react';
import '../App.css';

export default function Card({ type, data, returnBookHandler }) {
  const redirect = (url) => window.location.href = url;

  return (
    <div className='shelves-card'>
      <div className='shelves-card-poster' style={{ backgroundImage: `url(${data.imageurl})` }}></div>
      <h4>{data.bookname}</h4>
      <div>
        <div className='shelves-card-catgory'>{data.category}</div>
        <div>{data.authorname}</div>
        <div>{data.ratings} stars</div>
      </div>
      <div>
        <button
          style={{ backgroundColor: '#222', color: 'white' }}
          onClick={async () => {
            if (type === 'update') {
              redirect(`/updatebook/${data._id}`);
            } else if (type === 'borrow') {
              await returnBookHandler(data._id); // Call the returnBookHandler function with the id
            } else {
              redirect(`/books/details/${data._id}`);
            }
          }}
        >
          {type === 'update' ? 'Update book' : type === 'borrow' ? 'Return book' : 'Details'}
        </button>
      </div>
    </div>
  );
}

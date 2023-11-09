import React from 'react';
import '../../App.css';
import src from '../../assets/Bibliophile-pana.svg'

export default function Hero() {
  return (
    <section className='app-afterHeader'>
      <section className='app-hero-container-a'>
        <div>
          <h1>Add, View And Borrow Books With Libaryio</h1>
          <div className='app-hero-cta'>
            <button onClick={()=>window.location.href = '/signup'}>sign up now</button>
            <button style={{width:'150px'}}><a href='#search' style={{color:'inherit', textDecoration:'none'}}>Search books</a></button>
          </div>
        </div>
        <div>
          <img
            src={src}
            className='app-hero-poster'
          />
        </div>
      </section>
    </section>
  );
}

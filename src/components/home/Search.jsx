import React from 'react';
import '../../App.css';
import src from '../../assets/File searching-rafiki.svg'

export default function Search() {
  return (
    <section className='app-afterHeader' id='search'>
      <section className='app-hero-container-a'>
        <div>
          <h1>Contact Us Now</h1>
          <div className='app-home-search'>
            <input value={'ash520025@gmail.com'} disabled/>
            <button style={{textAlign:'center'}}><a  href='mailto:ash520025@gmail.com' style={{color:'inherit', textDecoration:'none', textAlign:'center'}}>contact</a></button>
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

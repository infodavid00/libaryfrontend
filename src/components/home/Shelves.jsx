import React from 'react';
import '../../App.css';
import data from '../../data/categories.json'

export function Card({data}) {
 return (
   <div className='home-shelves-card' onClick={()=> window.location.href='/books/'+data.name}>
   <div style={{backgroundImage: `url(${data.image})`}}> {/* relevant image */} </div> 
   <h4>{data.name}</h4>
   </div>
 )
}

export default function Shelve() {
  return (
   <section className='home-shelves'>
     {data.map(current => <Card key={current.id} data={current} />)}
   </section>
  )
}
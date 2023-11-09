import React from 'react'
import data from '../data/footer.json'

const Lists = ({data}) => {
  return (
   <ol>
    <li>{data.title}</li>
    {data.title === 'Mobile A' ?
     <li><a>{data.link}</a></li> : 
     <li><a href={`mailto:${data.link}`}>{data.link}</a></li>
    }
   </ol>
  )
}

export default function Footer() {
  return (
     <section className="app-afterHeader app-footer-container">
       {data.map(current => <Lists key={current.title} data={current} />)}
     </section>
  )
}

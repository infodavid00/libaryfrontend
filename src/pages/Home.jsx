import React from 'react'
import '../App.css'
import Header from '../utils/Header'
import Hero from '../components/home/Hero'
import Shelve from '../components/home/Shelves'
import Search from '../components/home/Search'
import About from '../components/home/About'
import Footer from '../utils/Footer'

export default function Home() {
  return (
   <div>
    {/* main conatainer  */}
    <section className='app-container-fit'>
      <Header active={'home'}/>
      <Hero />
      <Shelve />
      <Search />
      <About />
    </section>
    {/* main conatainer  */}
    <Footer />
   </div>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {endpoint} from '../utils/Config'
import '../App.css'
import '../Material.css'
import { Menu, Moon, Sun } from 'react-feather'
import { CheckTheme, DarkTheme, LightTheme} from './Theme'


  const Mobmenu = ({active = 'home', isloading, data}) => {
    return (
     <div className='material-mobileonly app-header-a-navlists app-header-a-navlists-mobile'>
     <li onClick={()=>window.location.href = '/'} 
     className={active === 'home' ? 'app-header-a-navlists-active' : null}>Home</li>

     <li onClick={()=>window.location.href = '/addbook'} 
     className={active === 'addbook' ? 'app-header-a-navlists-active' : null}>Add Book</li>

     <li onClick={()=>window.location.href = '/allbooks'} 
     className={active === 'allbooks' ? 'app-header-a-navlists-active' : null}>All Books</li>

     <li onClick={()=>window.location.href = '/borrowedbooks'}
     className={active === 'borrowbook' ? 'app-header-a-navlists-active' : null}>Borrowed Books</li>

    {isloading === true ? null : (
      <>
      {data === null ? <button onClick={()=>window.location.href = '/signin'}>sign in here</button> : (
      <>
      <button>{data.username}</button>
      <button onClick={() => (localStorage.removeItem('signature'), window.location.reload())}>Logout</button>
      </>
      ) }
      </>
    )}
     </div>
    )
  }


export default function Header({active = 'home'}) {
  const theme = CheckTheme()
  const [Mobilemenu, setMobilemenu] = useState(false)
  const toogleMobile = () => {
    return setMobilemenu(!Mobilemenu)
  }
  const [data, setdata] = useState(null);
  const [isloading, setisloading] = useState(true);

  const signature = () => {
    const sign = localStorage.getItem('signature');
    return sign !== null ? JSON.parse(sign).signature : null;
  };

   useEffect(() => {
    const fetchData = async () => {
      setisloading(true)
      if (signature() !== null) {
        try {
          const url = endpoint + 'user/' + signature();
          const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' }
          });
          setdata(response.data.data);
          setisloading(false)
        } catch (err) {
          setdata(null);
          setisloading(false)
        }      
      } else {
        setdata(null)
        setisloading(false)
      }
    };

    fetchData();
  }, []); 

  return (
     <header className='app-header-a'>
     <section>
     <h4 style={{fontFamily:'interbold', color:'var(--app-clA)'}}>LIBARYIO</h4>
     <ul className={'app-header-a-navlists material-widescreensonly'}>
     <li onClick={()=>window.location.href = '/'} 
     className={active === 'home' ? 'app-header-a-navlists-active' : null}>Home</li>

     <li onClick={()=>window.location.href = '/addbook'} 
     className={active === 'addbook' ? 'app-header-a-navlists-active' : null}>Add Book</li>

     <li onClick={()=>window.location.href = '/allbooks'} 
     className={active === 'allbooks' ? 'app-header-a-navlists-active' : null}>All Books</li>

     <li onClick={()=>window.location.href = '/borrowedbooks'}
     className={active === 'borrowbook' ? 'app-header-a-navlists-active' : null}>Borrowed Books</li>

    {isloading === true ? null : (
      <>
      {data === null ? <button onClick={()=>window.location.href = '/signin'}>sign in here</button> : (
      <>
      <button>{data.username}</button>
      <button onClick={() => (localStorage.removeItem('signature'), window.location.reload())}>Logout</button>
      </>
      ) }
      </>
    )}
    </ul>
 
     <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
       {theme==='dark' ? 
       <Sun width={22} strokeWidth={1} onClick={()=> LightTheme()} /> :
       <Moon width={22} strokeWidth={1} onClick={()=> DarkTheme()} />}
       <Menu width={22} strokeWidth={1} className='material-mobileonly' onClick={()=> toogleMobile()} />
      </div>
     </section>

     {Mobilemenu === true ? <Mobmenu active={active} isloading={isloading} data={data} /> : null}
   </header>
  )
}

import React,{useState} from 'react'
import Header  from '../utils/Header'
import axios from 'axios'
import {endpoint} from '../utils/Config'
import Loader from '../utils/Loader'

function Signin() {
  const [emailvalue, setemailvalue] = useState('')
  const [passwordvalue, setpasswordvalue] = useState('')
  const handleemailchange = (e) => setemailvalue(e.target.value)
  const handlepasswordchange = (e) => setpasswordvalue(e.target.value)

  const userscheme = {
   email: emailvalue,
   password: passwordvalue,
  }

  const [iserr, setiserr] = useState(false)
  const [errormessage, seterrormessage] = useState('')
  const [isloading, setisloading] = useState(false)

  async function handleAuthentication(data) {
    try {
      setisloading(true)
      const url = endpoint+'signin';
      console.log(url)
      const response = await axios.post(url, data, {
       headers: {'Content-Type': 'application/json'}})
      const rs = response.data
      console.log(rs)
      if (rs.acknowledged === true) {
      localStorage.setItem('signature', JSON.stringify({signature : rs.token}))
      window.location.href= '/'
      }
      else {
        seterrormessage(rs.message)
        setiserr(true)
        setisloading(false)
      }
      } catch (err) {
        seterrormessage('an unknown error occured!')
        setiserr(true)
        setisloading(false)
        } finally {
          // setisloading(false)
        }
  }

  return (
    <>
    {isloading === true ? <Loader />: null}
    <Header />
    <div className='auth-board'>
     <h2>Signin to Libaryio</h2>
     <input type='email' placeholder='email' value={emailvalue} onChange={handleemailchange} onClick={()=> setiserr(false)} />
     <input type='password' placeholder='password' value={passwordvalue} onChange={handlepasswordchange} onClick={()=> setiserr(false)}/>
     {iserr === true ? <div style={{fontFamily:'interR',padding:'2vh 2px',color:'var(--app-clA)',fontSize:'14.2px'}}>{errormessage}</div> : null} 
     <button onClick={()=> handleAuthentication(userscheme)}>sign in</button>
    </div>
    </>
  )
}

export default Signin

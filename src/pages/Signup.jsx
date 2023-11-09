import React,{useState} from 'react'
import Header  from '../utils/Header'
import axios from 'axios'
import {endpoint} from '../utils/Config'
import Loader from '../utils/Loader'

function Signup() {
  const [emailvalue, setemailvalue] = useState('')
  const [passwordvalue, setpasswordvalue] = useState('')
  const [usernamevalue, setusernamevalue] = useState('')
  const handleemailchange = (e) => setemailvalue(e.target.value)
  const handlepasswordchange = (e) => setpasswordvalue(e.target.value)
  const handleusernamechange = (e) => setusernamevalue(e.target.value)

  const userscheme = {
   username: usernamevalue,
   password: passwordvalue,
   email: emailvalue
  }

  const [iserr, setiserr] = useState(false)
  const [errormessage, seterrormessage] = useState('')
  const [isloading, setisloading] = useState(false)

  
 async function handleAuthentication(data) {
  if (data.password.length <6) {
    setiserr(true)
    seterrormessage('password must be more than 6')
  }
  else if (!/[A-Z]/.test(data.password)) {
    setiserr(true);
    seterrormessage('password must contain a capital letter');
  } 
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
    setiserr(true);
    seterrormessage('Password must contain a symbol');
  } 
  else if (data.username.length <6) {
    setiserr(true)
    seterrormessage('username must be more than 6 characters')
  }
  else if (data.email.length <6) {
    setiserr(true)
    seterrormessage('email must be more than 6 characters')
  } else {
     // make request
      try {
      setisloading(true)
         const url = endpoint+'signup';
         console.log(url)
         const response = await axios.post(url, data, {
          headers: {'Content-Type': 'application/json'}})
         const rs = response.data
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
 }


  return (
    <>
    {isloading === true ? <Loader />: null}
    <Header />
    <div className='auth-board'>
     <h2>Signup to Libaryio</h2>
     <input type='email' placeholder='email' value={emailvalue} onChange={handleemailchange} onClick={()=> setiserr(false)} />
     <input type='password' placeholder='password' value={passwordvalue} onChange={handlepasswordchange} onClick={()=> setiserr(false)} />
     <input type='text' placeholder='username' value={usernamevalue} onChange={handleusernamechange} onClick={()=> setiserr(false)} />
     {iserr === true ? <div style={{fontFamily:'interR',padding:'2vh 2px',color:'var(--app-clA)',fontSize:'14.2px'}}>{errormessage}</div> : null}
     <button  onClick={()=> handleAuthentication(userscheme)}>sign up</button>
    </div>
    </>
  )
}

export default Signup

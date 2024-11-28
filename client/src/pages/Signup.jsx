import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSucess } from '../util'
const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }
    console.log("Login->",signupInfo)
    const handleSignup= async(e)=>{
        e.preventDefault()
        const{ name, email, password } = signupInfo
        if(!name || !email| !password){
            return handleError("All Filds are must be filled")
        }
        try{
            const url = "http://localhost:8080/auth/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const result = await response.json();
            if(result.success){
                handleSucess(result.message)
                setTimeout(()=>{
                    navigate("/login")
                }, 3000)
            }else{
                handleError(result.error?.details[0].message)
            }
            console.log(result)
        }catch(err){
            handleError(err.message)
        }
    }
  return (
    <div className='container'>
        <h1>Signup</h1>
        <form action="" onSubmit={handleSignup}>
            <div className=''>
                <label htmlFor="name">Name</label>
                <input type="text"
                    onChange={handleChange}
                    name='name'
                    autoFocus
                    placeholder='Enter UR Name...'
                    value={signupInfo.name}
                />
            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input type="email"
                    onChange={handleChange}
                    name='email'
                    autoFocus
                    placeholder='Enter UR Email...'
                    value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor="passsword">Password</label>
                <input type="password"
                    onChange={handleChange}
                    name='password'
                    placeholder='Enter UR Password...'
                    value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already Have a Account?
                <Link to="/login"></Link>
            </span>
        </form>
        <ToastContainer />

    </div>
  )
}

export default Signup
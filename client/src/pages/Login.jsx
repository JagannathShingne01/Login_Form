import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSucess } from '../util'
const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)
    }
    console.log("Login->",loginInfo)
    const handleLogin= async(e)=>{
        e.preventDefault()
        const{ email, password } = loginInfo
        if(!email| !password){
            return handleError("All Filds are must be filled")
        }
        try{
            const url = "http://localhost:8080/auth/login"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginInfo)
            });
            const result = await response.json();
            if(result.success){
                handleSucess(result.message)
                localStorage.setItem('token', result.jwToken)
                localStorage.setItem('loggedInUser', result.name)
                setTimeout(()=>{
                    navigate("/home")
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
        <h1>Login</h1>
        <form action="" onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">E-mail</label>
                <input type="email"
                    onChange={handleChange}
                    name='email'
                    autoFocus
                    placeholder='Enter UR Email...'
                    value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor="passsword">Password</label>
                <input type="password"
                    onChange={handleChange}
                    name='password'
                    placeholder='Enter UR Password...'
                    value={loginInfo.password}
                />
            </div>
            <button type='submit'>Login</button>
            <span>do not Have an Account? {'    '}
                <Link to="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer />

    </div>
  )
}

export default Login
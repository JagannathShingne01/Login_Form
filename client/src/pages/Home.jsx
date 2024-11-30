import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from '../util';
import {ToastContainer} from 'react-toastify'
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [product, setProduct ] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
 
  const handleLogout = (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSucess('User Log Out')

    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
const fetchProduct = async()=>{
      try {
        const url = "http://localhost:8080/products"

        const headers = {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }
        const response = await fetch(url, headers)
        const result = await response.json()
        console.log(result)
        setProduct(result)
      } catch (error) {
        handleError(error)
      }
}

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <>
    <div>{loggedInUser}</div>
    <button onClick={handleLogout}>Log Out</button>
    <div>{
      product && product.map((item, idx) => 
        (<ul>
          {item.name} : {" "}
          {item.price}
        </ul>))
      }
    </div>
    <ToastContainer/>
    </>
  )
}

export default Home
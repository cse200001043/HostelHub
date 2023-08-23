import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    
    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert("Enter Valid credentials")
    }
    else {
      navigate("/");
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email address</label>
            <input type='text' className='form-control' name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className='m-3 btn btn-success'>Submit</button>
          <Link to="/signupstudent" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </>
  )
}

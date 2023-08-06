import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  });

  const [signupSuccess, setSignupSuccess] = useState(false); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("https://moodforfood-backend.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();

    if (json.success) {
      setSignupSuccess(true); // Show success message
    } else {
      alert("Enter valid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
      
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        {signupSuccess && <p className="text-success">Signed up successfully!</p>} {/* Display success message */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
        </div>
        {/* ... rest of your form fields ... */}
        <button type="submit" className="m-3 btn btn-text-white bg-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
      </form>   
    </div>
  )
}

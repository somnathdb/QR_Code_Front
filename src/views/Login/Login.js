import React, { useState } from "react";
import './Login.css';
import './log.css'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login() {
  const [modalData, setModalData] = useState({
    password: "",
    number: ""
  });

  const history = useHistory(); // Initialize useHistory hook outside of the function

  const handleChange = evt => {
    const value = evt.target.value;
    setModalData({
      ...modalData,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (event) => {
    alert("Hi")
    event.preventDefault(); // Prevent default form submission behavior

    try {
      console.log("22", modalData);
      let response = await axios.post('http://13.127.182.122:5004/mobileuser/mobileUserLogin', modalData);
      
      if (response.status === 200 && response.data.status === true) {
        setModalData({
          number: "",
          password: ""
        });
        localStorage.setItem('token', response.token)
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    } catch (error) {
      history.push("/");
    }
  };

  return (
    <div className="row">
      <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit} method="POST"> {/* Change method to POST */}
          <h1>Login</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebook />
            </a>
            <a href="#" className="social">
              <FaInstagram />
            </a>
            <a href="#" className="social">
              <FaLinkedin />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="varchar"
            placeholder="Enter Mobile Number"
            name="number"
            value={modalData.number}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={modalData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button> {/* Changed to type="submit" */}
        </form>
      </div>
      <div className='col-6 mb-5' />
      <div className="form-container sign-in-container1 col-md-6" style={{ backgroundColor: "white", textAlign: "center", height: "690px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ height: "300px", width: "300px", verticalAlign: "middle" }} alt="lotus" />
      </div>
    </div>
  );
}

export default Login;
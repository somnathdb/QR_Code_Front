// import React, { useState } from "react";
// import './log.css';
// // import './Login.css'
// import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
// import axios from 'axios';
// import { useHistory } from "react-router-dom";


// function Login() {
//   const [modalData, setModalData] = useState({
//     password: "",
//     number: ""
//   });

//   const history = useHistory(); // Initialize useHistory hook outside of the function

//   const handleChange = evt => {
//     const value = evt.target.value;
//     setModalData({
//       ...modalData,
//       [evt.target.name]: value
//     });
//   };

//   const handleOnSubmit = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     try {
//       let response = await axios.post('http://www.localhost:5003/mobileuser/mobileUserLogin', modalData);
      
//       if (response.status === 200 && response.data.status === true) {
//         setModalData({
//           number: "",
//           password: ""
//         });
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//         history.push("/admin/dashboard");
//       } else {
//         alert("Wrong Credentials")
//         history.push("/");
//       }
//     } catch (error) {
//         alert("Wrong Credentials")
//     }
//   };

//   return (
//     <div className="row">
//       <div className="form-container sign-in-container">
//         <form onSubmit={handleOnSubmit} method="POST">
//           <h1>Login</h1>
//           <div className="social-container">
//             <a href="#" className="social">
//               <FaFacebook />
//             </a>
//             <a href="#" className="social">
//               <FaInstagram />
//             </a>
//             <a href="#" className="social">
//               <FaLinkedin />
//             </a>
//           </div>
//           <span>or use your account</span>
//           <input
//             type="varchar"
//             placeholder="Enter Mobile Number"
//             name="number"
//             value={modalData.number}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={modalData.password}
//             onChange={handleChange}
//           />
//           <button type="submit">Login</button> 
//         </form>
//       </div>
//       <div className='col-6 mb-5' />
//       <div className="form-container sign-in-container1 col-md-6" style={{ backgroundColor: "white", textAlign: "center", height: "690px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ height: "300px", width: "300px", verticalAlign: "middle" }} alt="lotus" />
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import './log.css';
// import './Login.css'
// import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function Login() {
  const [modalData, setModalData] = useState({
    password: "",
    number: ""
  });

  const history = useHistory(); 

  const handleChange = evt => {
    const value = evt.target.value;
    setModalData({
      ...modalData,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post('http://13.127.182.122:5004/mobileuser/mobileUserLogin', modalData);
      
      if (response.status === 200 && response.data.status === true) {
        setModalData({
          number: "",
          password: ""
        });
        localStorage.setItem("user", JSON.stringify(response.data.data));
        history.push("/admin/dashboard");
      } else {
        alert("Wrong Credentials")
        history.push("/");
      }
    } catch (error) {
        alert("Wrong Credentials")
    }
  };

  return (
    <div className="row">
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://challengesimages.s3.ap-south-1.amazonaws.com/MML+Logo.png"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are The menon and menon Team</h4>
                      </div>
                      <form onSubmit={handleOnSubmit} method="POST">
                        <p>Please login to your account</p>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="varchar"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            name="number"
                            value={modalData.number}
                            onChange={handleChange}
                          />
                   
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={modalData.password}
                                onChange={handleChange}
                          />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Log in
                          </button>
                          {/* <a className="text-muted" href="#!">
                            Forgot password?
                          </a> */}
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Dont have an account?</p>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 d-flex align-items-center"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                      menon and menon ltd is a company based in Kolhapur, Maharashtra. We have been involved in the manufacturing of intricate automotive grey iron castings like cylinder blocks and heads for over 50 years. We have facilities to not only cast these blocks and heads, but also to machine these components as per the customers requirements. We have set up a Greenfield state-of-the-art foundry at Kagal, near Kolhapur, which brings world class casting manufacturing facilities to India and it also effectively doubles our production capacity. We currently produce castings for almost all the Indian automotive OEMs. With the installation of this Division we can offer large capacities for exports. We are supported by one of the best, most vibrant and passionate teams in the industry. Our belief in constantly updating our technology, improving our skills and increasing our productivity has been able to give us an edge over competition. Meeting international standards of quality continues to be our primary focus. Our capable quality systems and business capabilities have won us several awards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
}

export default Login;




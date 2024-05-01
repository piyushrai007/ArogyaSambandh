import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoBlack from './logo-white.png'; // Importing the image

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };
    const register = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('user_type', userType);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('address_line1', addressLine1);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', pincode);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture, profilePicture.name);
        }

        axios.post('https://piyushrai.pythonanywhere.com/api/register/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response);
            navigate("/login");
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="hero_area">
        {/* header section strats */}
        <header className="header_section">
          <div className="header_bottom">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="/">
                <img src={logoBlack} alt="Logo" /> {/* Using the imported image */}
                  
                </a>
  
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className=""> </span>
                </button>
  
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                          Home <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">
                          {' '}
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="contact.html">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="quote_btn-container">
                    <a href="/login">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span>Login</span>
                    </a>
                    <a href="/register">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span>Sign Up</span>
                    </a>
                    <form className="form-inline">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>
        {/* end header section */}
  
        {/* contact section */}
        <section className="contact_section layout_padding-bottom">
          <div className="container">
            <div className="heading_container">
              <h2>Register Now</h2>
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="form_container">
                  <form action="">
                  <div>
    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
</div>
<div>
    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
</div>
<div>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
<div>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
</div>
<div>
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
</div>
<div>
    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select User Type</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
    </select>
</div>
<div>
    <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
</div>
<div>
    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
</div>
<div>
    <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
</div>
<div>
    <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
</div>

                    <div>
                                        <input type="file" onChange={handleFileChange} />
                                    </div>
                                    <div className="btn_box">
                                        <button type="button" onClick={register}>Register</button>
                                    </div>
                                </form>
                </div>
              </div>
              
              <div className="col-md-5">
                <div className="img-box">
                  <img src="images/contact-img.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end contact section */}
  
        {/* info section */}
        <section className="info_section ">
          <div className="container">
            <div className="info_top">
              <div className="info_logo">
                <a href="">
                <img src={logoBlack} alt="Logo" /> {/* Using the imported image */}
                  
                </a>
              </div>
            </div>
            <div className="info_bottom layout_padding2">
              <div className="row info_main_row">
                <div className="col-md-6 col-lg-3">
                  <h5>Address</h5>
                  <div className="info_contact">
                    <a href="">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <span>Location</span>
                    </a>
                    <a href="">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <span>Call +91 9691529465</span>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope"></i>
                      <span>piyushraivds45@gail.com</span>
                    </a>
                  </div>
                  <div className="social_box">
                    <a href="">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info_links">
                    <h5>Useful link</h5>
                    <div className="info_links_menu">
                      <a className="active" href="index.html">
                        Home
                      </a>
                      <a href="/">About</a>
                      <a href="/">Contact us</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info_post">
                    <h5>LATEST POSTS</h5>
                    <div className="post_box">
                      <div className="img-box">
                        <img src="images/post1.jpg" alt="" />
                      </div>
                      <p>Normal distribution</p>
                    </div>
                    <div className="post_box">
                      <div className="img-box">
                        <img src="images/post2.jpg" alt="" />
                      </div>
                      <p>Normal distribution</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info_post">
                    <h5>News</h5>
                    <div className="post_box">
                      <div className="img-box">
                        <img src="images/post3.jpg" alt="" />
                      </div>
                      <p>Normal distribution</p>
                    </div>
                    <div className="post_box">
                      <div className="img-box">
                        <img src="images/post4.png" alt="" />
                      </div>
                      <p>Normal distribution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end info_section */}
  
        {/* footer section */}
        <footer className="footer_section">
          <div className="container">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By{' '}
              <a href="https://www.linkedin.com/in/piyush-rai-3b8714226/">ArogyaSamabadh</a>
            </p>
          </div>
        </footer>
        {/* end footer section */}
      </div>
    );
  };
    
export default Registration;
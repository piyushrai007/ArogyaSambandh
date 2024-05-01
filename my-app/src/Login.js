import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logoBlack from './logo-white.png'; // Importing the image

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('https://piyushrai.pythonanywhere.com/api/login/', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('userid', response.data.user_id);
                if (response.data.user_type === 'doctor') {
                    navigate("/doctor-dashboard");
                } else if (response.data.user_type === 'patient') {
                    navigate("/patient-dashboard");
                }
            } else {
                setErrorMessage('Bad request. Please check your username and password.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
        }
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

            {/* login section */}
            <section className="contact_section layout_padding-bottom">
          <div className="container">
            <div className="heading_container">
                        <h2>Login</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="form_container">
                                <form onSubmit={handleLogin}>
                                    <div>
                                        <input name="username" type="text" placeholder="Username" required />
                                    </div>
                                    <div>
                                        <input name="password" type="password" placeholder="Password" required />
                                    </div>
                                    <div className="btn_box">
                                        <button type="submit">Login</button>
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
            {/* end login section */}

            
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
}

export default Login;

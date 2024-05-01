import React from 'react';

const Header = () => {
  return (
    <div className="hero_area">
      {/* header section strats */}
      <header className="header_section">
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <a className="navbar-brand" href="index.html">
                <img src="images/logo-black.png" alt="" />
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
                <span> </span>
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
    </div>
  );
};

export default Header;

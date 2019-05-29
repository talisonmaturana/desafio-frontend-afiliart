import React from 'react';

import { Link } from 'react-router-dom';

const header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div>
                <Link className="navbar-brand text-white" to='/dashboard'>
                    LOGO
                </Link>
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active text-white" to='/courses'>
                        Courses
                    </Link>
                    <Link className="nav-item nav-link text-white" to='/about'>
                        About
                    </Link>
                    <a className="nav-item nav-link text-white border-left">
                        <i className="fas fa-user  mr-2"></i> Talison Maturana
                    </a>
                    <a className="nav-item nav-link text-white" >
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </a>

                </div>
            </div>
        </nav>
    )
}

export default header;
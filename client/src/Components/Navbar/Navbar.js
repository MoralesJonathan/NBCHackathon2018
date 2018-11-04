import React, { Component } from 'react';

class Navbar extends React.Component {
    render () {
        return (
                <nav class="navbar navbar-light bg-light">
                    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="https://via.placeholder.com/50" style={{ 'margin-right': '15px' }} width="50" height="50" class="d-inline-block align-top" alt="" />
                        Company Name
                    </a>
                    <form class="form-inline d-none d-lg-block">
                        <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Settings</button>
                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                    <div class="collapse navbar-collapse" id="navbarToggler">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 d-lg-none">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }
};


export default Navbar;
import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
                <nav className="navbar navbar-light">
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">
                        <img src="/tempLogo.png" style={{ 'marginRight': '15px' }} width="50" height="50" class="d-inline-block align-top" alt="" />
                    Poder Vote
                    </a>
                    <form className="form-inline d-none d-lg-block">
                        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Settings</button>
                        <button className="btn btn-outline-primary my-2 my-sm-0" onClick={()=>{
                            evt.preventDefault();
                            localStorage.removeItem("jwtToken");
                            window.location.reload();
                        }}>Logout</button>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 d-lg-none">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }
};


export default Navbar;
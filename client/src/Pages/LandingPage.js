import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import './LandingPage.css'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills : [
                {title: 'Pepe title number 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'}
            ]
        }
        this.onLogout = this.onLogout.bind(this);
    } 
    componentDidMount(){
        //make cool api call
        //save to state
    }
    createCard(data){
        return (<div className="col-md-4 col-12"><div className="card"> <div className="card-body"><h1 className="card-title text-primary">{data.title}</h1> <h3 className="card-subtitle mb-2 text-muted">Community bill</h3> <p class="card-text">{data.description}</p><div class="d-none d-md-block"> <button type="button" class="btn btn-outline-secondary">Ignore</button> <button type="button" className="btn btn-outline-success">Take Action</button> </div></div></div></div>);
    }
    onLogout(evt) {
        evt.preventDefault();
        localStorage.removeItem("jwtToken");
        window.location.reload();
    }
    loadCards() {
        let cards = [];
        const grid = [];
        const bills = [...this.state.bills]
        for (let x = 0; x < bills.length; x++) {
            if (cards.length < 2) {
                cards.push(this.createCard(bills[x]));
            }
            else {
                cards.push(this.createCard(bills[x]));
                grid.push(<div className="row">{cards}</div>)
                cards = [];
            }
        }
        if(cards.length > 0){
            grid.push(<div className="row">{cards}</div>)
        }
        return grid
    }
    render() {
        return (
            <div>
                <Navbar logout={this.onLogout} />
                <div id="landingPageCard">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-12">
                                    <h1 className="card-title text-primary">Super cool tax reform bill</h1>
                                    <h3 className="card-subtitle mb-2 text-muted">Community bill</h3>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. Nam bibendum auctor massa, vitae consectetur odio accumsan a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. </p>
                                </div>
                                <div className="col-md-4 d-none d-sm-flex">
                                    <img src="https://via.placeholder.com/400x200"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" id="cards-container">
                    {this.loadCards()}
                </div>
            </div>
        );
    }
}
export default LandingPage;
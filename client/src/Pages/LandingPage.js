import React, { Component } from 'react';
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
    } 
    componentDidMount(){
        //make cool api call
        //save to state
    }
    createCard(data){
        return (<div class="col-md-4 col-12"><div class="card"> <div class="card-body"><h1 class="card-title text-primary">{data.title}</h1> <h3 class="card-subtitle mb-2 text-muted">Community bill</h3> <p class="card-text">{data.description}</p><div class="d-none d-md-block"> <button type="button" class="btn btn-outline-secondary">Ignore</button> <button type="button" class="btn btn-outline-success">Take Action</button> </div></div></div></div>);
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
                grid.push(<div class="row">{cards}</div>)
                cards = [];
            }
        }
        if(cards.length > 0){
            grid.push(<div class="row">{cards}</div>)
        }
        return grid
    }
    render() {
        return (
            <div>
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
                <div id="landingPageCard">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8 col-12">
                                    <h1 class="card-title text-primary">Super cool tax reform bill</h1>
                                    <h3 class="card-subtitle mb-2 text-muted">Community bill</h3>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. Nam bibendum auctor massa, vitae consectetur odio accumsan a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. </p>
                                </div>
                                <div class="col-md-4 d-none d-sm-flex">
                                    <img src="https://via.placeholder.com/400x200"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" id="cards-container">
                    {this.loadCards()}
                </div>
            </div>
        );
    }
}
export default LandingPage;
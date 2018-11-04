import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import './LandingPage.css'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills : [
                {title: 'Pepe title number 1', billID: '1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 2', billID: '2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 3', billID: '3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 2', billID: '4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'},
                {title: 'Pepe title number 3', billID: '5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro accusamus debitis a, minus praesentium cupiditate repellat excepturi magni? Pariatur in architecto cupiditate? Dicta rem ipsa placeat culpa voluptatibus exercitationem.'}
            ]
        }
    } 
    componentDidMount(){
        //make cool api call
        //save to state
    }
    createCard(data){
        return (<div class="col-md-4 col-12"><div class="card"> <div class="card-body"><h1 class="card-title text-primary">{data.title}</h1> <h3 class="card-subtitle mb-2 text-muted">Community bill</h3> <p class="card-text">{data.description}</p><div class="d-none d-md-block"> <button type="button" class="btn btn-outline-secondary">Ignore</button> <a href={"/bill/"}><button type="button" class="btn btn-outline-takeAction">Take Action</button> </a></div></div></div></div>);
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
                <Navbar/>
                <div id="landingPageCard">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8 col-12">
                                    <h1 class="card-title text-featured">Super cool tax reform bill</h1>
                                    <h3 class="card-subtitle mb-2 text-subfeatured">Community bill</h3>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. Nam bibendum auctor massa, vitae consectetur odio accumsan a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis hendrerit mattis. Aliquam rhoncus dapibus ultrices. </p>
                                </div>
                                <div class="col-md-4 d-none d-sm-flex">
                                    <img id="featuredImage" src="https://via.placeholder.com/400x200"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" id="cards-container">
                    {this.loadCards()}
                </div>
                <footer>
                    <div class="container">
                    <span>Copyright por lo menos</span>
                    <span style={{float: 'right'}}>Ya tu sabes inc</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default LandingPage;
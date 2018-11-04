import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import './LandingPage.css'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featuredBill: {},
            bills : []
        }
    } 
    componentDidMount(){
        axios.post("/api/ballot/issues/",  { state: 'fl', issues: [ 'guns', 'healthcare', 'education' ] })
        .then( (response) => {
            console.log(response)
            this.setState({featuredBill:response.data[0], bills : response.data.splice(1)})
          })
          .catch((error) => {
            console.log(error);
          });
    }
    createCard(data){
        return (<div className="col-md-4 col-12"><div className="card"> <div className="card-body"><h3 className="card-title text-primary">{data.title}</h3>  <p className="card-text card-text-overflow" style={{'display': '-webkit-box', '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical'}}>{data.summary}</p><div className="d-none d-md-block"> <button type="button" className="btn btn-outline-secondary">Ignore</button> <a href={"/bill/"+data.id}><button type="button" className="btn btn-outline-takeAction">View ballot</button> </a></div></div></div></div>);
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
                <Navbar/>
                <div id="landingPageCard">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-12">
                                    <h1 className="card-title text-featured">{this.state.featuredBill.title}</h1>
                                    <h3 className="card-subtitle mb-2 text-subfeatured">Community bill</h3>
                                    <p className="card-text">{this.state.featuredBill.summary}</p>
                                </div>
                                <div className="col-md-4 d-none d-sm-flex">
                                    <img id="featuredImage" src="/voteHeader.png" with="400" height="200"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" id="cards-container">
                    {this.loadCards()}
                </div>
                <footer>
                    <div className="container">
                    <span>Copyright por lo menos</span>
                    <span style={{float: 'right'}}>Ya tu sabes inc</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default LandingPage;
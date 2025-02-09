import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import jwt_decode from 'jwt-decode'
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
import './LandingPage.css'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featuredBill: {},
            bills: [],
            firstName: '',
            loading: true
        }
        this.onLogout = this.onLogout.bind(this);
    }
    createCard(data) {
        return (<div className="col-md-4 col-12"><div className="card"> <div className="card-body"><h3 className="card-title text-primary">{data.title}</h3>  <p className="card-text card-text-overflow" style={{ 'display': '-webkit-box', '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical' }}>{data.summary}</p><div className="d-none d-md-block"> <button type="button" className="btn btn-outline-secondary">Ignore</button> <button onClick={this.saveTitle.bind(this, data)} type="button" className="btn btn-outline-takeAction">View ballot</button></div></div></div></div>);
    }
    onLogout(evt) {
        evt.preventDefault();
        localStorage.removeItem("jwtToken");
        window.location.reload();
    }
    componentDidMount() {
        let options = { state: 'fl', issues: ['guns', 'healthcare', 'education'] };
        if (localStorage.getItem("language") == "spanish") {
            options.lang = "es";
        }
        let token = localStorage.getItem("jwtToken")
        token = jwt_decode(token);
        console.log(this.props)
        // this.setState({firstName: token})
        axios.post("/api/ballot/issues/", options)
            .then((response) => {
                console.log(response)
                function arrayRemove(arr, value) {

                    return arr.filter(function(ele){
                        return ele != value;
                    });
                 
                 }
                for(let x=0; x<response.data.length; x++){
                    for(let y=0; y<response.data.length; y++){
                        if(response.data[x].title===response.data[y].title){
                            response.data.splice(x, 1);
                        }
                    }
                }
                this.setState({ featuredBill: response.data[0], loading: false, bills: response.data.splice(1) })
            })
            .catch((error) => {
                console.log(error);
            });
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
        if (cards.length > 0) {
            grid.push(<div className="row">{cards}</div>)
        }
        return grid
    }
    saveTitle(bill) {
        localStorage.setItem('billTitle', bill.title);
        localStorage.setItem('billDescription', bill.summary);
        window.location.href = "/bill/" + bill.id;
    }
    render() {
        const translate = this.props.translate;
        const transitionOptions = {
            transitionName: "fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500
        }

        return (
            <div>
                <Navbar logout={this.onLogout} />
                <div id="landingPageCard">
                    <div className="card">
                        <div className="card-body">
                            {/* <div class="row">
                                <div class="col-sm-12">
                                    <h2 id="welcomeMessage">Welcome back {this.state.firstName}!</h2>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-8 col-12">
                                    <h1 className="card-title text-featured">{this.state.featuredBill.title}</h1>
                                    <h3 className="card-subtitle mb-2 text-subfeatured">{translate('communityBill')}</h3>
                                    <p className="card-text">{this.state.featuredBill.summary}</p>
                                </div>
                                <div className="col-md-4 d-none d-sm-flex">
                                    <img id="featuredImage" src="/voteHeader.png" with="400" height="200"></img>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                    <button style={{backgroundColor:'transparent', color: 'white'}} onClick={this.saveTitle.bind(this, this.state.featuredBill)} type="button" className="btn btn-outline-takeAction">View ballot</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.loading &&
                    <div id="loaderBG"> </div>
                }
                <PropagateLoader
                    style={{ zIndex: 10000 }}
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
                <div className="container" id="cards-container">

                    {this.loadCards()}
                </div>
                <footer>
                    <div className="container">
                        <span>Copyright 2018</span>
                        <span style={{ float: 'right' }}>Made with &hearts; in Miami</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default LandingPage;
import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import './ActionPage.css';

class ActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            reps: [],
            title: "Make hackathons great again",
            billNumber: this.props.match.params.id,
        }
    }
    componentDidMount() {
        let mockResponse = {"reps":[
            {
                "name": "Jerry Hill",
                "photo": "https://senate.ca.gov/sites/senate.ca.gov/files/senator_photos/senator_hill.jpg",
                "party": "Democratic",
                "email": "senator.hill@sen.ca.gov",
                "district": "13"
            },
            {
                "name": "Marc Berman",
                "photo": "https://assembly.ca.gov/sites/assembly.ca.gov/files/memberphotos/ad24_berman_roster150_20161205.jpg",
                "party": "Democratic",
                "email": "assemblymember.berman@assembly.ca.gov",
                "district": "24"
            }
        ],
            "votingInfo":{
                
                "address": {
                "locationName": "Coral Way K-8 Center",
                "line1": "1950 SW 13 Ave",
                "city": "Miami",
                "state": "FL",
                "zip": "33145"
                    },
            "notes": "Late activation 2pm",
            "pollingHours": "7:00AM to 7:00PM",
                }
        };

        this.setState({reps: mockResponse.reps, loading: false});

    }
    createCard(data){
        return (
        <div className="col-md-4 col-12">
            <div className="card"> 
                <img class="card-img-top" src={data.photo}></img>
                <div className="card-body">
                    <h3 className="card-title text-primary">{data.name}</h3>  
                    <p className="card-text card-text-overflow" style={{ 'display': '-webkit-box', '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical' }}>{`${data.party} Party, District ${data.district}`}</p>
                    <div className="d-none d-md-block">
                        <a href={`mailto:${data.email}`}><button className="btn btn-outline-takeAction">Email</button></a>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    LoadRepCards(){
        let cards = [];
        const grid = [];
        const reps = [...this.state.reps]
        for (let x = 0; x < reps.length; x++) {
            if (cards.length < 2) {
                cards.push(this.createCard(reps[x]));
            }
            else {
                cards.push(this.createCard(reps[x]));
                grid.push(<div className="row">{cards}</div>)
                cards = [];
            }
        }
        if (cards.length > 0) {
            grid.push(<div className="row">{cards}</div>)
        }
        return grid
    }
    render() {
        return (
            <div>
                <Navbar />
                <div class="container" id="billInfo">
                {this.state.loading &&
                    <div id="loaderBG"> </div>
                }
                    <div class="row justify-content-sm-center">
                        <div class="col-sm-12 ">
                            <h1 class="text-center">{this.state.title}</h1>
                        </div>
                    </div>
                    <div class="row justify-content-sm-center">
                        <div class="col-sm-12 ">
                            <h3 class="text-center">#{this.state.billNumber}</h3>
                        </div>
                    </div>
                    {this.LoadRepCards()}
                </div>
            </div>
        );
    }
}
export default ActionPage;
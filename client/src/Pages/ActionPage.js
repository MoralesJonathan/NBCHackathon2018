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
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet cursus massa. Aliquam commodo at nisi sed facilisis. Suspendisse varius nulla id maximus convallis. Fusce in luctus metus. Proin et ipsum ut lacus euismod dapibus. Nam rhoncus, turpis vel sodales ornare, arcu magna tempus est, laoreet ullamcorper dolor justo et dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed pulvinar in enim eget tempor. Morbi urna velit, feugiat id erat nec, viverra tempor lorem. Vestibulum in vehicula odio, et dapibus augue. Cras ornare mauris at interdum mattis. Curabitur posuere volutpat lobortis. Sed tempus sapien pretium, pharetra lectus eu, molestie nunc. Maecenas euismod diam eu viverra luctus.\nCurabitur vitae pulvinar lacus. Sed dictum massa id ligula rutrum consectetur. Cras sit amet urna nibh. Suspendisse at auctor nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ullamcorper ante libero, nec faucibus odio consectetur vel. Aliquam commodo faucibus tortor vitae sodales. Nulla sit amet leo ut eros tristique varius a vel nibh.\nDonec a felis sit amet tortor venenatis bibendum. Sed gravida elit sit amet metus feugiat efficitur. Integer sed facilisis massa. Aenean sollicitudin aliquet erat, sit amet mattis tellus iaculis nec. Duis felis dolor, lobortis at scelerisque quis, rutrum ac augue. Maecenas lobortis nec neque in ornare. In aliquet lorem non eros faucibus bibendum. Morbi semper eros est, a blandit arcu auctor et. Donec cursus blandit convallis. Curabitur cursus imperdiet sem, ut hendrerit tellus dictum et. Aenean vestibulum dui hendrerit bibendum dapibus. Suspendisse potenti. Nunc varius erat sit amet vestibulum pharetra. Quisque id volutpat lacus. Suspendisse efficitur magna et orci tempor, sed viverra erat euismod."
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
                        <button className="btn btn-outline-takeAction">Email</button>
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
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="text-justify" id="billDescription">{this.state.description}</div>
                        </div>
                    </div>
                    {this.LoadRepCards()}
                </div>
            </div>
        );
    }
}
export default ActionPage;
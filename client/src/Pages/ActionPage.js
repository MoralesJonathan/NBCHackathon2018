import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import './ActionPage.css';

class ActionPage extends Component {
    constructor(props) {
        super(props);
        const address = localStorage.getItem("address") ? encodeURI(localStorage.getItem("address")) : '33185';
        this.state = {
            address: address,
            loading: true,
            reps: [],
            title: "Make hackathons great again",
            billNumber: this.props.match.params.id,
        }
    }
    componentDidMount() {
        axios.get(`/api/legislator/address/${this.state.address}`).then((data)=>{
            this.setState({reps: data.data.reps, loading: false});
        })

    }
    createCard(data){
        return (
        <div className="col-md-4 col-12">
            <div className="card"> 
                <img class="card-img-top" src={data.photo}></img>
                <div className="card-body">
                    <h3 className="card-title text-primary">{data.name}</h3>  
                    <p className="card-text card-text-overflow" style={{ 'display': '-webkit-box', '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical' }}>{`${data.party} Party, District ${data.district}`}</p>
                    <div>
                        <a href={`mailto:${data.email}`}><button className="btn btn-outline-takeAction">Email</button></a>
                        <a href={`mailto:${data.email}`}><button className="btn btn-outline-takeAction">Twitter</button></a>
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
                <div className="container" id="billInfo">
                {this.state.loading &&
                    <div id="loaderBG"> </div>
                }
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-12 ">
                            <h1 className="text-center">{this.state.title}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-12 ">
                            <h3 className="text-center">#{this.state.billNumber}</h3>
                        </div>
                    </div>
                    {this.LoadRepCards()}
                </div>
            </div>
        );
    }
}
export default ActionPage;
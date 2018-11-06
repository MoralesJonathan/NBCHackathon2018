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
        axios.get(`/api/legislator/address/${this.state.address}`).then((data) => {
            this.setState({ reps: data.data.reps, loading: false });
        })

    }
    createCard(data) {
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
    LoadRepCards() {
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8281.529153137864!2d-80.38736215722905!3d25.794546953954487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9be95617c4aa5%3A0x8baa56634473aac!2sTelemundo+Center!5e0!3m2!1sen!2sus!4v1541350358734" width="100%" height="500" frameborder="0" style={{"border":"0", "margin":"auto"}} allowfullscreen></iframe>
            </div>
        );
    }
}
export default ActionPage;
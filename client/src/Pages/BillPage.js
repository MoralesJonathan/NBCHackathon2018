import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import './BillPage.css';

class BillPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            loading: true,
            pdf: '',
            pageNumber: 1,
            title: "",
            billNumber: this.props.match.params.id,
            description: ""
        }
    }
    componentDidMount() {
        axios.get("https://newsapi.org/v2/everything?q=handguns&domains=nbcnews.com,cnbc.com,msnbc.com&pageSize=10from=2018-01-01", { headers: { Authorization: '888a8ee387634ef28edd9e8104f9f6d8' } })
            .then((response) => {
                let slideItems = []
                for (let x = 0; x < response.data.articles.length; x++) {
                    if (x == 0) {
                        slideItems.push(<div class="carousel-item active"> <img class="d-block w-100" src={response.data.articles[x].urlToImage} alt="Slide" /> <div class="carousel-caption d-none d-md-block"> <h5>{response.data.articles[x].source.name} - {response.data.articles[x].title}</h5> <p>By: {response.data.articles[x].author}</p> </div> </div>)
                    } else {
                        slideItems.push(<div class="carousel-item"> <img class="d-block w-100" src={response.data.articles[x].urlToImage} alt="Slide" /> <div class="carousel-caption d-none d-md-block"> <h5>{response.data.articles[x].source.name} - {response.data.articles[x].title}</h5> <p>By: {response.data.articles[x].author}</p> </div> </div>)
                    }

                }
                this.setState({ slides: slideItems },
                    () => {
                        axios.get(`/api/ballot/${this.props.match.params.id}`)
                            .then(response => {
                                let billTitle = localStorage.getItem('billTitle');
                                this.setState({ pdf: response.data.pdf, loading: false, title: billTitle});
                            })
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    decreasePageNumber = () => {
        let PageNumber = this.state.pageNumber;
        PageNumber = PageNumber - 1;
        this.setState({ pageNumber: PageNumber })
    }
    increasePageNumber = () => {
        let PageNumber = this.state.pageNumber;
        PageNumber = PageNumber + 1;
        this.setState({ pageNumber: PageNumber })
    }
    render() {
        const translate = this.props.translate;
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
                        <div class="col-sm-12 " id="billDescription">
                            <Document file={this.state.pdf}>
                                <Page pageNumber={this.state.pageNumber} />
                            </Document>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-30px', marginBottom: '50px' }}>
                        <div class="col-sm-12 " id="pdfPageControl">
                            <center>
                                {
                                    this.state.pageNumber > 1 ? (
                                        <div>
                                            <button type="button" class="btn btn-light" onClick={this.decreasePageNumber}> &lt; Previous Page </button>
                                            <button type="button" class="btn btn-light" onClick={this.increasePageNumber}> Next Page &gt; </button>
                                        </div>) : (
                                            <button type="button" onClick={this.increasePageNumber} class="btn btn-light"> Next Page > </button>
                                    )
                                }
                            </center>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>Potential Side effects:</h5>
                            <img style={{ "max-width": "100%" }} src="/tempGraph.png"></img>
                        </div>
                        <div class="col-sm-6">
                            <h5>In the media:</h5>
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    {this.state.slides}
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div class="row">
                        <div class="col-6" id="ignoreButton">
                            <a href="/" style={{ 'color': 'inherit' }}>
                                <p class="text-center"><strong>{translate('ignore')}</strong></p>
                            </a>
                        </div>
                        <div class="col-6" id="actionButton">
                            <a href={`/takeaction/${this.state.billNumber}`} style={{ 'color': 'inherit' }}>
                                <p class="text-center"><strong>{translate('takeAction')}</strong></p>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default BillPage;
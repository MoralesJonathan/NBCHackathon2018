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
            title: "Make hackathons great again",
            billNumber: this.props.match.params.id,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet cursus massa. Aliquam commodo at nisi sed facilisis. Suspendisse varius nulla id maximus convallis. Fusce in luctus metus. Proin et ipsum ut lacus euismod dapibus. Nam rhoncus, turpis vel sodales ornare, arcu magna tempus est, laoreet ullamcorper dolor justo et dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed pulvinar in enim eget tempor. Morbi urna velit, feugiat id erat nec, viverra tempor lorem. Vestibulum in vehicula odio, et dapibus augue. Cras ornare mauris at interdum mattis. Curabitur posuere volutpat lobortis. Sed tempus sapien pretium, pharetra lectus eu, molestie nunc. Maecenas euismod diam eu viverra luctus.\nCurabitur vitae pulvinar lacus. Sed dictum massa id ligula rutrum consectetur. Cras sit amet urna nibh. Suspendisse at auctor nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ullamcorper ante libero, nec faucibus odio consectetur vel. Aliquam commodo faucibus tortor vitae sodales. Nulla sit amet leo ut eros tristique varius a vel nibh.\nDonec a felis sit amet tortor venenatis bibendum. Sed gravida elit sit amet metus feugiat efficitur. Integer sed facilisis massa. Aenean sollicitudin aliquet erat, sit amet mattis tellus iaculis nec. Duis felis dolor, lobortis at scelerisque quis, rutrum ac augue. Maecenas lobortis nec neque in ornare. In aliquet lorem non eros faucibus bibendum. Morbi semper eros est, a blandit arcu auctor et. Donec cursus blandit convallis. Curabitur cursus imperdiet sem, ut hendrerit tellus dictum et. Aenean vestibulum dui hendrerit bibendum dapibus. Suspendisse potenti. Nunc varius erat sit amet vestibulum pharetra. Quisque id volutpat lacus. Suspendisse efficitur magna et orci tempor, sed viverra erat euismod."
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
                                this.setState({ pdf: response.data.pdf, loading: false });
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
                                            <button type="button" class="btn btn-light" onClick={this.decreasePageNumber}> &lt; {translate('previous')} Page </button>
                                            <button type="button" class="btn btn-light" onClick={this.increasePageNumber}> {translate('next')} Page &gt; </button>
                                        </div>) : (
                                            <button type="button" onClick={this.increasePageNumber} class="btn btn-light"> {translate('next')} Page > </button>
                                    )
                                }
                            </center>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>{translate('sideEffects')}</h5>
                            <img style={{ "max-width": "100%" }} src="/tempGraph.png"></img>
                        </div>
                        <div class="col-sm-6">
                            <h5>{translate('media')}</h5>
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    {this.state.slides}
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">{translate('previous')}</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">{translate('next')}</span>
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
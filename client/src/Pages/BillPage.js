import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import './BillPage.css';

class BillPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Make hackathons great again",
            billNumber: "1337",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet cursus massa. Aliquam commodo at nisi sed facilisis. Suspendisse varius nulla id maximus convallis. Fusce in luctus metus. Proin et ipsum ut lacus euismod dapibus. Nam rhoncus, turpis vel sodales ornare, arcu magna tempus est, laoreet ullamcorper dolor justo et dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed pulvinar in enim eget tempor. Morbi urna velit, feugiat id erat nec, viverra tempor lorem. Vestibulum in vehicula odio, et dapibus augue. Cras ornare mauris at interdum mattis. Curabitur posuere volutpat lobortis. Sed tempus sapien pretium, pharetra lectus eu, molestie nunc. Maecenas euismod diam eu viverra luctus.\nCurabitur vitae pulvinar lacus. Sed dictum massa id ligula rutrum consectetur. Cras sit amet urna nibh. Suspendisse at auctor nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ullamcorper ante libero, nec faucibus odio consectetur vel. Aliquam commodo faucibus tortor vitae sodales. Nulla sit amet leo ut eros tristique varius a vel nibh.\nDonec a felis sit amet tortor venenatis bibendum. Sed gravida elit sit amet metus feugiat efficitur. Integer sed facilisis massa. Aenean sollicitudin aliquet erat, sit amet mattis tellus iaculis nec. Duis felis dolor, lobortis at scelerisque quis, rutrum ac augue. Maecenas lobortis nec neque in ornare. In aliquet lorem non eros faucibus bibendum. Morbi semper eros est, a blandit arcu auctor et. Donec cursus blandit convallis. Curabitur cursus imperdiet sem, ut hendrerit tellus dictum et. Aenean vestibulum dui hendrerit bibendum dapibus. Suspendisse potenti. Nunc varius erat sit amet vestibulum pharetra. Quisque id volutpat lacus. Suspendisse efficitur magna et orci tempor, sed viverra erat euismod."
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div class="container" id="billInfo">
                    <div class="row justify-content-sm-center">
                        <div class="col-sm-12 ">
                            <h1 class="text-center">{this.state.title}</h1>
                        </div>
                    </div>
                    <div class="row justify-content-sm-center">
                        <div class="col-sm-12 ">
                            <h3 class="text-center">{this.state.billNumber}</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="text-justify" id="billDescription">{this.state.description}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>Potential Side effects:</h5>
                            <p>56% cloudy with a chance of meatballs.</p>
                        </div>
                        <div class="col-sm-6">
                            <h5>In the media:</h5>
                            <p>Not yet...</p>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                        <div class="row">
                            <div class="col-sm-6" id="ignoreButton">
                                <p class="text-center">Ignore</p>
                            </div>
                            <div class="col-sm-6" id="actionButton">
                                <p class="text-center">Take action</p>
                            </div>
                        </div>
                    </footer>
            </div>
        );
    }
}
export default BillPage;
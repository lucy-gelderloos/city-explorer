import axios from 'axios';
import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Map from './Map.js';
import Weather from './Weather.js';
import Movies from './Movies.js'

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            cityName: 'Seattle',
            lat: 0,
            lon: 0,
            forecast: [],
            error: false,
            searchFor: 'Seattle'
        };
        this.locationApiKey = process.env.REACT_APP_LOCATION_IQ_API_KEY;
        this.locationUrl = "https://us1.locationiq.com/v1/search.php?format=json";
        this.server = process.env.REACT_APP_SERVER_LOCAL
        // this.server = process.env.REACT_APP_SERVER_REMOTE
        // this.forecastArr = [];
    }
    
    handleInputCity = (event) => {
        this.setState({searchFor: event.target.value});
        console.log('handleInputCity this.setState searchFor',this.state.searchFor);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({cityName:this.state.searchFor});
        this.handleSearchCity(this.state.searchFor);
    }
 
    handleSearchCity = (searchFor) => {
        const API = `${this.locationUrl}&key=${this.locationApiKey}&q=${searchFor}`;
        console.log('handleSearchCity API url',API);
        axios.get(API)

        .then(response => {
            console.log('handleSearchCity .then response',response.data[0].lon);
            this.setState({ lat:response.data[0].lat, lon:response.data[0].lon });
        })

        .catch(err => {
            console.log(err);
            this.setState({error:`Sorry, I don't recognize that one! (${err.code}: ${err.message})`});
        })
    }

    roundToTwo(num){
        return Number.parseFloat(num).toFixed(2);
    }

    render() {
        console.log('render this.state.lon, this.state.cityName', this.state.lon, this.state.cityName);
        return (
        <div className="Main">
            <Alert show={this.state.error} onClose={() => this.setState({error:false})} dismissible>{this.state.error}</Alert>
            <Row>
                <Col id="mainInfo">
                    <div id="searchForm">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Control type="text" onChange={this.handleInputCity} placeholder="Search for a city" />
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">Explore!</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Card id="results">
                        <Card.Body>
                            <Card.Title>{this.state.cityName}</Card.Title>
                            <Card.Subtitle>Latitude: {Math.round(this.state.lat)}, <br />Longitude: {Math.round(this.state.lon)}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <Weather key={this.state.cityName} lat={this.roundToTwo(this.state.lat)} lon={this.roundToTwo(this.state.lon)}  />
                </Col>
                <Col>
                    <Map key={this.state.cityName} lat={this.state.lat} lon={this.state.lon} />
                </Col>
            </Row>
            <Row>
                <Movies key={this.state.cityName} cityName ={this.state.cityName} />
            </Row>
        </div>
        );
    }
  }
  
  export default Main;
import Map from './Map.js';
import Weather from './Weather.js';
// import Input from './Input.js';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

// weather url: https://city-explorer-b34ce2.herokuapp.com/

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            cityName: '',
            lat: '',
            lon: '',
            forecast: '',
            error: '',
            searchFor: ''
        };
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        this.weatherUrl = "http://localhost:3030/weather?";
    }
    
    handleInputCity = (event) => {
        this.setState({searchFor: event.target.value});
        // console.log('event.target.value', event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleSearchCity(this.state.searchFor);
        // console.log('searchFor', this.state.searchFor)
    }
    
    handleSearchCity = (searchFor) => {
        const API = `https://us1.locationiq.com/v1/search.php?format=json&key=${this.apiKey}&q=${searchFor}&format=json`;
        axios.get(API)

        .then(response => {
            this.setState({ cityName:this.state.searchFor, lat:response.data[0].lat, lon:response.data[0].lon });
        })

        .catch(err => {
            console.log(err);
            this.setState({error:`Sorry, I don't recognize that one!`});
        })
    }

    render() {
        // console.log('render this.state', this.state);
        // console.log('render lon',this.state.lon);
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
                    <Card id="forecast">
                        <Card.Body>
                            <Weather key={this.state.cityName} cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Map key={this.state.cityName} lat={this.state.lat} lon={this.state.lon} />
                </Col>
            </Row>
        </div>
        );
    }
  }
  
  export default Main;
  
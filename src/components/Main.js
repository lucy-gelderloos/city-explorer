import Map from './Map.js';
// import Input from './Input.js';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

// weather url: https://city-explorer-b34ce2.herokuapp.com/
// full url: https://us1.locationiq.com/v1/search.php?format=json&key=pk.0b8f887fdd8b9e9ce24daafe3e11972a&q=seattle

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            cityName: '',
            lat: '',
            lon: '',
            forecast: '',
            success: true
        };
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        this.weatherUrl = ""
        this.cities = props.cities;
        // this.blankSearch = true;
    }
    
    handleInputCity = event => {
        this.setState({searchFor: event.target.value});
        // console.log('event.target.value', event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleSearchCity(this.state.searchFor);
        console.log('searchFor', this.state.searchFor)
    }

    getWeather = (cityName,lat,lon) => {
        const weatherUrl = `http://localhost:3030/weather?cityName=${cityName}&lat=${lat}&lon=${lon}`;
        // const weatherUrl = `https://city-explorer-b34ce2.herokuapp.com/weather?cityName=${cityName}&lat=${lat}&lon=${lon}`;
        axios.get(weatherUrl)
        .then(response => {
           this.setState({forecast: response.data});
            console.log('this.state.forecast', this.state.forecast);
        })
    }
    
    handleSearchCity = (searchFor) => {
        const API = `https://us1.locationiq.com/v1/search.php?format=json&key=${this.apiKey}&q=${searchFor}&format=json`;
        axios.get(API)
        .then(response => {
        this.setState({ cityName:response.data[0].display_name, lat:Math.round(response.data[0].lat), lon:Math.round(response.data[0].lon) });
        this.getWeather(this.state.searchFor, Math.round(response.data[0].lat), Math.round(response.data[0].lon));
        

        })
        .catch(err => {
        this.setState({success:false});
        })
    }

    render() {
        // console.log('render this.state', this.state);
        return (
        <div className="Main">
            {/* <Alert show={this.success} onClose={() => this.success = false} dismissible>Please enter Seattle, Olympia, or Portland</Alert> */}
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
                            <Card.Subtitle>Latitude: {this.state.lat}, <br />Longitude: {this.state.lon}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Map lat={this.state.lat} lon={this.state.lon} />
                </Col>
            </Row>
        </div>
        );
    }
  }
  
  export default Main;
  
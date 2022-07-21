import Map from './Map.js';
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

    constructor(props){
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
        this.weatherUrl = "http://localhost:3030/weather?"
        // this.weatherUrl = "https://city-explorer-b34ce2.herokuapp.com/?"
        this.cities = props.cities;
        // this.blankSearch = true;
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

    getWeather = (cityName,lat,lon) => {
        const weatherQuery = `${this.weatherUrl}cityName=${cityName}&lat=${lat}&lon=${lon}`;
        console.log('weatherQuery',weatherQuery);
        axios.get(weatherQuery)
        .then(response => {
            console.log('response.data', response.data);
            this.setState({forecast: response.data});
            console.log('this.state.forecast', this.state.forecast);
        })
        .catch(err => {
            console.log(err);
            this.setState({error:`Sorry, I don't have the weather for that city! Please enter Seattle, Amman, or Paris.`});
            // eventually, this shouldn't be triggered by the same conditions as the invalid locationIQ search error - either add another state or move the whole weather process into a component & deal with it there
        })
    }
    
    handleSearchCity = (searchFor) => {
        const API = `https://us1.locationiq.com/v1/search.php?format=json&key=${this.apiKey}&q=${searchFor}&format=json`;
        axios.get(API)

        .then(response => {
            this.setState({ cityName:this.state.searchFor, lat:response.data[0].lat, lon:response.data[0].lon });
            // console.log('this.state.lat', this.state.lat);
            this.getWeather(this.state.searchFor, Math.round(response.data[0].lat), Math.round(response.data[0].lon));
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
  
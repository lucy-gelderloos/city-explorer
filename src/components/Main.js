import Map from './Map.js';
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
            forecast: [],
            error: false,
            searchFor: ''
        };
        this.locationApiKey = process.env.REACT_APP_LOCATION_IQAPI_KEY;
        this.weatherApiKey = process.env.REACT_APP_WEATHERBITAPI_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        // this.weatherUrl = "http://localhost:3030/weather?"
        this.weatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily?"
        this.cities = props.cities;
        this.forecastArr = [];
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

    getWeather = (lat,lon) => {
        const weatherQuery = `${this.weatherUrl}key=${this.weatherApiKey}&lat=${lat}&lon=${lon}`;
        console.log('weatherQuery',weatherQuery);
        axios.get(weatherQuery)
        .then(response => {
            console.log('response.data.data', response.data.data);
            this.setState({forecast: response.data.data});
            this.forecastArr = response.data.data.map(el => <Col key={response.data.data.indexOf(el)}><strong>{el.valid_date}</strong><br />{el.weather.description}<br />High of {el.high_temp}, low of {el.low_temp}</Col>)
            return this.forecastArr;
        })
        .catch(err => {
            console.log(err);
            this.setState({error:`Sorry, I don't have the weather for that city! Please enter Seattle, Amman, or Paris. (${err.code}: ${err.message})`});
        })
    }
    
    handleSearchCity = (searchFor) => {
        const API = `https://us1.locationiq.com/v1/search.php?format=json&key=pk.0b8f887fdd8b9e9ce24daafe3e11972a&q=${searchFor}`;
        // const API = `https://us1.locationiq.com/v1/search.php?format=json&key=${this.locationApiKey}&q=${searchFor}`;
        axios.get(API)

        .then(response => {
            this.setState({ cityName:this.state.searchFor, lat:response.data[0].lat, lon:response.data[0].lon });
            // console.log('this.state.lat', this.state.lat);
            this.getWeather(this.roundToTwo(response.data[0].lat), this.roundToTwo(response.data[0].lon));
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
                    <Card id="forecastCard">
                        <Card.Title>16-day Forecast</Card.Title>
                        <Card.Body>
                            {this.forecastArr}
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
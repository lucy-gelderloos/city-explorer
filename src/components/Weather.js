import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast:[],
            error:false
        }
        this.lat = props.lat;
        this.lon = props.lon;
        this.forecastArr = [];
        this.server = process.env.REACT_APP_SERVER_LOCAL
        // this.server = process.env.REACT_APP_SERVER_REMOTE
    }

getWeather = (lat,lon) => {
    const weatherQuery = `${this.server}/weather?lat=${lat}&lon=${lon}`;
    axios.get(weatherQuery)

    .then(response => {
        this.setState({forecast: response.data});
        this.forecastArr = response.data.map(el => <Col key={response.data.indexOf(el)}><strong>{el.date}</strong><br />{el.condition}<br />High of {el.high}, low of {el.low}</Col>);
        return this.forecastArr;
    })
    .catch(err => {
        console.log('error in getWeather',err);
        this.setState({error:`Sorry, I don't have the weather for that city! (${err.code}: ${err.message})`});
    })
}

render() {
    this.getWeather(this.lat, this.lon);
    return (
        <div className="weather">
            <Card id="forecastCard">
                <Card.Title>16-day Forecast</Card.Title>
                <Card.Body>
                    {this.forecastArr}
                </Card.Body>
            </Card>
        </div>
    )
}
}

export default Weather;

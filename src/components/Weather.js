import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast:[],
            error:false
        }
    }

render() {
    return (
        <div className="weather">
            <Card id="forecastCard">
                <Card.Title>16-day Forecast</Card.Title>
                <Card.Body>
                    {this.props.forecast.map(el => <Col key={this.props.forecast.indexOf(el)}><strong>{el.date}</strong><br />{el.condition}<br />High of {Math.round(el.high)}, low of {Math.round(el.low)}</Col>)}
                </Card.Body>
            </Card>
        </div>
    )
}
}

export default Weather;

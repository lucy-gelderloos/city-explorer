import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class WeatherDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast:[],
            error:false
        }
    }

render() {
    return (
        <Col>
            {this.props.forecast.map(el => 
            <Card className='singleDayForecast' key={this.props.forecast.indexOf(el)}>
                <Card.Title>{el.date}</Card.Title>
                <Card.Body>{el.condition}<br />High of {Math.round(el.high)}, low of {Math.round(el.low)}</Card.Body>
            </Card>
            )}
        </Col>
    )
}
}

export default WeatherDay;

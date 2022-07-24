import React from 'react';
import Row from 'react-bootstrap/Row';
import WeatherDay from './WeatherDay.js';

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
            <Row>
                <WeatherDay forecast={this.props.forecast} />
            </Row>
        </div>
    )
}
}

export default Weather;

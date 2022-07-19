import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.lat = props.lat;
        this.lon = props.lon;
        this.mapSearchUrl = 'https://maps.locationiq.com/v3/staticmap?';
        this.apiKey = process.env.REACT_APP_API_KEY;
    }

    displayMap(lat,lon) {
        let mapUrl = `${this.mapSearchUrl}key=${this.apiKey}&center=${this.lat},${this.lon}`
        return mapUrl;
    }

    render() {
        return (
            <div className="map">
                <img src={this.mapUrl} alt=""/>
            </div>
        )
    }
}

export default Map;


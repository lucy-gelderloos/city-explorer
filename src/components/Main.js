import Map from './Map.js';
// import Input from './Input.js';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import axios from 'axios';

// full url: https://us1.locationiq.com/v1/search.php?format=json&key=pk.0b8f887fdd8b9e9ce24daafe3e11972a&q=seattle

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            cityName: null,
            latitude: null,
            longitude: null,
            success: true
        };
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        this.cities = props.cities;
    }

    
    handleInputCity = event => {
        this.setState({searchFor: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleSearchCity(this.state.searchFor);
    }
    
    handleSearchCity = (searchFor) => {
        // const API = `${this.searchURL}key=${this.apiKey}&q=${this.cityName}}&format=json`;
        // const res = await axios.get(API);
        // console.log(res.data[0])
        // this.setState({ location:res.data[0] });

        const testSearch = this.cities.filter(el => el.cityName === searchFor);
        this.setState({ cityName:testSearch[0].cityName, latitude:testSearch[0].lat, longitude:testSearch[0].lon})
    }

    render() {
        console.log(this.state);
        return (
        <div className="Main">
            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Search for a city</Form.Label>
                <Form.Control type="text" onChange={this.handleInputCity} placeholder="City" />
                <Button type="submit">Explore!</Button>
            </Form>
            <Card>
                <Card.Body>
                    <Card.Title>{this.state.cityName}</Card.Title>
                    <Card.Subtitle>Latitude: {this.state.latitude}, Longitude: {this.state.longitude}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Map lat={this.state.latitude} lon={this.state.longitude} />
        </div>
        );
    }
  }
  
  export default Main;
  
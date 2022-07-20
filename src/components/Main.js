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
// full url: https://us1.locationiq.com/v1/search.php?format=json&key=pk.0b8f887fdd8b9e9ce24daafe3e11972a&q=seattle

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            cityName: '',
            lat: '',
            lon: '',
            success: true
        };
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        this.cities = props.cities;
        // this.blankSearch = true;
    }

    
    handleInputCity = event => {
        this.setState({searchFor: event.target.value});
        console.log('event.target.value', event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleSearchCity(this.state.searchFor);
        console.log('searchFor', this.state.searchFor)
    }
    
    handleSearchCity = (searchFor) => {
        const API = `https://us1.locationiq.com/v1/search.php?format=json&key=${this.apiKey}&q=${searchFor}&format=json`;
        axios.get(API)
        .then(response => {
        console.log('response.data[0]',response.data[0].display_name);
        this.setState({ cityName:response.data[0].display_name, lat:response.data[0].lat, lon:response.data[0].lon });
        console.log('this.state', this.state);
        })
        .catch(err => {
        this.setState({success:false});
        })
    }

    render() {
        console.log('render this.state', this.state);
        return (
        <div className="Main">
            <Alert show={this.success} onClose={() => this.success = false} dismissible>Please enter Seattle, Olympia, or Portland</Alert>
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
                            <Card.Title>{this.state.city.display_name}</Card.Title>
                            <Card.Subtitle>Latitude: {this.state.city.lat}, <br />Longitude: {this.state.city.lon}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Map lat={this.state.city.lat} lon={this.state.city.lon} />
                </Col>
            </Row>
        </div>
        );
    }
  }
  
  export default Main;
  
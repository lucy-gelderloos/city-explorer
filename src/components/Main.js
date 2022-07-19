import Map from './Map.js';
// import Input from './Input.js';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import axios from 'axios';

// full url: https://us1.locationiq.com/v1/search.php?format=json&key=pk.0b8f887fdd8b9e9ce24daafe3e11972a&q=seattle

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            city: {},
            searchFor: '',
            cityName: 'Seattle',
            latitude: 48,
            longitude: 122,
            success: true
        };
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.searchUrl = "https://us1.locationiq.com/v1/search.php?format=json&";
        this.cities = props.cities;
        this.blankSearch = true;
    }

    
    handleInputCity = event => {
        this.setState({searchFor: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // demo of error message; replace when API is working
        if(this.state.searchFor === ''){
            this.blankSearch = true;
            console.log(this.blankSearch);
            return this.blankSearch;
        }
        else{
            this.handleSearchCity(this.state.searchFor);
        }
    }
    
    handleSearchCity = (searchFor) => {
        // const API = `${this.searchURL}key=${this.apiKey}&q=${this.cityName}}&format=json`;
        // axios.get(API);
        // .then(res => {
        // console.log(res.data[0]);
        // this.setState({ city:res.data[0] });
        // })
        // .catch(err => {
        // this.setState({success:false})
        // })

        const testSearch = this.cities.filter(el => el.cityName.toLowerCase() === searchFor.toLowerCase());
        this.setState({ cityName:testSearch[0].cityName, latitude:testSearch[0].lat, longitude:testSearch[0].lon})
    }

    render() {
        console.log(this.state);
        return (
        <div className="Main">
            <Alert show={this.blankSearch} onClose={() => this.blankSearch = false} dismissible>Please enter Seattle, Olympia, or Portland</Alert>
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
                            <Card.Subtitle>Latitude: {this.state.latitude}, <br />Longitude: {this.state.longitude}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Map lat={this.state.latitude} lon={this.state.longitude} />
                </Col>
            </Row>
        </div>
        );
    }
  }
  
  export default Main;
  
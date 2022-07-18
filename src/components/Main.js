import Map from './Map.js';
import Input from './Input.js';
import React from 'react';

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            city: null,
            latitude: null,
            longitude: null,
            success: true
        };
        this.key = "pk.0b8f887fdd8b9e9ce24daafe3e11972a";
        this.searchUrl = "https://us1.locationiq.com/v1/search?format=json&";
        // this.q = 'query';
    }



    componentDidMount() {
        this.searchCity();
      }
    
    searchCity = (ev) => {
        // ev.preventDefault();
        // let q = ev.target.value; 
        let q = 'seattle'; 
        if(!q) return false;
        let url = `${this.searchUrl}key=${this.key}&q${q}`;
        fetch(url)
            .then(response => {
                if(!response.ok) return response.statusText;
                return response.json();
            })
            .then(data => {
                this.data = data[0];
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    showResults =  () => {
        let results = JSON.stringify(this.data);
        console.log(results);
    }
            

    render() {
        return (
        <div className="Main">
            <Input />
            <Map />
        </div>
        );
    }
  }
  
  export default Main;
  
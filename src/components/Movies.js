import React from 'react';

import Col from 'react-bootstrap/Col';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:null
        }
    }
    
     render() {
        return (
            <div className="movies">
                {this.props.movies.map(el => <Col key={this.props.movies.indexOf(el)}><strong>{el.title}</strong><br />{el.overview}<br />{el.releaseDate}</Col>)}
            </div>
        )
    }
    }
    
    export default Movies;

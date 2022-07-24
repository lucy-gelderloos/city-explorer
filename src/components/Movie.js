import React from 'react';

import Card from 'react-bootstrap/Card';
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
                <Col>
                    {this.props.movies.map(el => 
                    <Card className='singleMovie' key={this.props.movies.indexOf(el)}>
                        <Card.Title>{el.title}</Card.Title>
                        <Card.Body>{el.overview}<br />{el.releaseDate}</Card.Body>
                    </Card>)
                    }
                </Col>
            </div>
        )
    }
    }
    
    export default Movies;

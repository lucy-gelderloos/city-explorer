import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';

class Input extends React.Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        return (
            <Form>
                <Form.Label>Search for a City</Form.Label>
                <Form.Control type="text" placeholder="City" />
                <Button type="submit">Explore!</Button>
            </Form>
        )
    }
}

export default Input;

import React from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import api from './api';

class MakeBenefactor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.makeBenefactor(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <Row>
        <Col xs={3}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup controlId="name">
              <ControlLabel>Nom de la vieweuse</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
                required
              />
            </FormGroup>
            <Button type="submit">Donner le succès mécène</Button>
          </Form>
        </Col>
      </Row>);
  }
}

export default MakeBenefactor;

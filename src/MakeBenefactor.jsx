import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import api from './api';

class MakeBenefactor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      viewers: [],
    };
  }

  componentWillMount() {
    api.getViewers((err, list) => {
      if (!err) {
        this.setState({
          ...this.state,
          viewers: list,
        });
      }
    });
  }

  handleChange(e) {
    this.setState({
      ...this.state,
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
      <Panel header="Mécène">
        <Form onSubmit={e => this.handleSubmit(e)} horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} md={3}>Pseudo</Col>
            <Col md={9}>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
                list="viewers"
                required
              />
              <datalist id="viewers">
                {this.state.viewers.map(v => <option value={v} key={v} />)}
              </datalist>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col mdOffset={3} md={9}>
              <Button type="submit">Donner le succès mécène</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default MakeBenefactor;

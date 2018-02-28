import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { addDonation } from './api';

export default class GiveAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: '',
      amount: 5,
    };
  }

  handleChange(newData) {
    this.setState({
      ...this.state,
      ...newData,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    addDonation(this.state.viewer.toLowerCase(), this.state.amount);
    this.setState({
      ...this.state,
      viewer: '',
    });
  }

  render() {
    const { data } = this.props;
    return data
      ? (
        <Panel header="Ajouter un don">
          <Form onSubmit={e => this.handleSubmit(e)} horizontal>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} md={3}>Pseudo</Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  value={this.state.viewer}
                  onChange={e => this.handleChange({ viewer: e.target.value })}
                  list="viewers"
                  required
                />
                <datalist id="viewers">
                  {data.viewers.map(v => <option value={v} key={v} />)}
                </datalist>
              </Col>
            </FormGroup>
            <FormGroup controlId="amount">
              <Col componentClass={ControlLabel} md={3}>Montant</Col>
              <Col md={9}>
                <FormControl
                  type="number"
                  value={this.state.amount}
                  onChange={e => this.handleChange({ amount: e.target.value })}
                  min={0.01}
                  step={0.01}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col mdOffset={3} md={9}>
                <Button type="submit">Ajouter le don</Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      )
      : <div />;
  }
}

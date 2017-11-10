import React from 'react';
import { ListGroupItem, Glyphicon, Button, Modal } from 'react-bootstrap';
import * as api from './api';

class AchievementItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showModal(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      showModal: false,
    });
  }

  confirm() {
    api.replayAchievement(this.props.achievement.id, this.props.viewer.id);
    this.setState({
      ...this.state,
      showModal: false,
    });
  }

  render() {
    return (
      <ListGroupItem header={this.props.achievement.name} >
        <Modal
          show={this.state.showModal}
          onHide={() => this.closeModal()}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>Rejouer le succès</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.achievement.name} pour {this.props.viewer.displayName}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Annuler</Button>
            <Button onClick={() => this.confirm()} bsStyle="primary">Rejouer</Button>
          </Modal.Footer>
        </Modal>
        {this.props.viewer.displayName}
        <Button
          onClick={e => this.showModal(e)}
          className="pull-right"
          bsSize="xsmall"
        >
          <Glyphicon glyph="repeat" />
        </Button>
      </ListGroupItem>
    );
  }
}

export default AchievementItem;

import React from 'react';
import { ListGroupItem, Glyphicon, Button, Modal } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { withApi } from './ApiContext';

class AchievementItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  confirm() {
    const { achievement, viewerId, api } = this.props;
    api.replayAchievement(achievement, viewerId);
    this.setState({ showModal: false });
  }

  render() {
    const { t, achievementName, viewerName } = this.props;
    const { showModal } = this.state;
    return (
      <ListGroupItem header={achievementName}>
        <Modal
          show={showModal}
          onHide={() => this.closeModal()}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('last_achievements.replay_achievement')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t('last_achievements.achievement_for', { achievement: achievementName, viewer: viewerName })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>{t('shared.cancel')}</Button>
            <Button onClick={() => this.confirm()} bsStyle="primary">{t('last_achievements.replay')}</Button>
          </Modal.Footer>
        </Modal>
        {viewerName}
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

export default withNamespaces()(withApi(AchievementItem));

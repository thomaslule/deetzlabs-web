import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import LastAchievements from './LastAchievements';
import AchievementsList from './AchievementsList';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import GiveAchievement from './GiveAchievement';
import FollowersGoal from './FollowersGoal';
import LangSelector from './LangSelector';
import Logout from './Logout';
import * as api from './api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    api.loadData().then((data) => {
      this.setState({ data });
    });
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <div>
        <PageHeader>{t('deetzlabs')} <Logout className="pull-right" /><LangSelector className="pull-right" /></PageHeader>
        {
          data
            ? (
              <Row>
                <Col md={6}>
                  <LastAchievements data={data} />
                  <TestButton />
                  <AlertVolume data={data} />
                  <GiveAchievement data={data} />
                  <FollowersGoal data={data} />
                </Col>
                <Col md={6}>
                  <AchievementsList data={data} />
                </Col>
              </Row>
            )
            : <div />
        }
      </div>
    );
  }
}

export default withNamespaces()(Dashboard);

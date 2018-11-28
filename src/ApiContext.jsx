import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { withNamespaces } from 'react-i18next';
import * as api from './api';

const ApiContext = React.createContext();

class ApiContextProviderToLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: {},
      alert: undefined,
      alertTimeout: undefined,
      alertLevel: undefined,
    };
  }

  observable(path) {
    const { subjects } = this.state;
    if (!subjects[path]) {
      this.update(path);
    }
    return subjects[path];
  }

  update(path) {
    const { subjects } = this.state;
    if (!subjects[path]) {
      subjects[path] = new BehaviorSubject(undefined);
    }
    api.get(path).then((value) => {
      subjects[path].next(value);
    });
  }

  achievements() {
    return this.observable('achievements');
  }

  lastAchievements() {
    return this.observable('last_achievements');
  }

  viewerAchievements() {
    return this.observable('viewer_achievements');
  }

  viewerNames() {
    return this.observable('viewer_names');
  }

  alertVolume() {
    return this.observable('achievement_alert_volume');
  }

  followersGoal() {
    return this.observable('followers_goal');
  }

  login(username, password) {
    return api.login(username, password);
  }

  async giveAchievement(achievement, viewer) {
    await api.giveAchievement(achievement, viewer);
    this.update('last_achievements');
    this.update('viewer_names');
    this.update('viewer_achievements');
  }

  async replayAchievement(achievement, viewerId) {
    await api.replayAchievement(achievement, viewerId);
  }

  async testAlert() {
    const { t } = this.props;
    try {
      await api.test();
      this.showAlert(t('alerts.sent_test'), 'success');
    } catch (err) {
      console.error(err);
      this.showAlert(t('alerts.error'), 'danger');
      throw err;
    }
  }

  async changeAlertVolume(volume) {
    await api.postAlertVolume(volume);
  }

  async changeFollowersGoal(goal, html, css) {
    await api.changeFollowersGoal(goal, html, css);
  }

  showAlert(alert, alertLevel) {
    const { alertTimeout } = this.state;
    clearTimeout(alertTimeout);
    this.setState({
      alert,
      alertLevel,
      alertTimeout: setTimeout(() => this.hideAlert(), 3000),
    });
  }

  hideAlert() {
    const { alertTimeout } = this.state;
    clearTimeout(alertTimeout);
    this.setState({ alert: undefined });
  }

  render() {
    const { children } = this.props;
    const { alert, alertLevel } = this.state;

    return (
      <ApiContext.Provider
        value={{
          login: (username, password) => this.login(username, password),
          achievements: () => this.achievements(),
          lastAchievements: () => this.lastAchievements(),
          viewerAchievements: () => this.viewerAchievements(),
          viewerNames: () => this.viewerNames(),
          alertVolume: () => this.alertVolume(),
          followersGoal: () => this.followersGoal(),
          giveAchievement: (achievement, viewer) => this.giveAchievement(achievement, viewer),
          replayAchievement: (achievement, viewerId) =>
            this.replayAchievement(achievement, viewerId),
          testAlert: () => this.testAlert(),
          changeAlertVolume: volume => this.changeAlertVolume(volume),
          changeFollowersGoal: (goal, html, css) => this.changeFollowersGoal(goal, html, css),
          showAlert: (msg, lvl) => this.showAlert(msg, lvl),
          hideAlert: () => this.hideAlert(),
          alert,
          alertLevel,
        }}
      >
        {children}
      </ApiContext.Provider>
    );
  }
}

export const ApiContextProvider = withNamespaces()(ApiContextProviderToLink);

export const ApiContextConsumer = ApiContext.Consumer;

export function withApi(Component) {
  return props => (
    <ApiContextConsumer>
      {context => <Component {...props} api={context} />}
    </ApiContextConsumer>
  );
}

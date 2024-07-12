import React from "react";
import { withNamespaces } from "react-i18next";
import { BehaviorSubject } from "rxjs";
import * as api from "./api";

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

  achievements() {
    return this.observable("achievements");
  }

  lastAchievements() {
    return this.observable("last_achievements");
  }

  viewerAchievements() {
    return this.observable("viewer_achievements");
  }

  viewerNames() {
    return this.observable("viewer_names");
  }

  started() {
    return this.observable("started");
  }

  alertVolume() {
    return this.observable("achievement_alert_volume");
  }

  followersGoal() {
    return this.observable("followers_goal");
  }

  async giveAchievement(achievement, viewer) {
    const { t } = this.props;
    try {
      await api.giveAchievement(achievement, viewer);
      this.showAlert(t("alerts.achievement_distributed"), "success");
      this.update("last_achievements");
      this.update("viewer_names");
      this.update("viewer_achievements");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async replayAchievement(achievement, viewerId) {
    const { t } = this.props;
    try {
      await api.replayAchievement(achievement, viewerId);
      this.showAlert(t("alerts.achievement_replayed"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async testAlert() {
    const { t } = this.props;
    try {
      await api.test();
      this.showAlert(t("alerts.sent_test"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async stop() {
    const { t } = this.props;
    try {
      await api.stop();
      this.showAlert(t("alerts.updated_parameter"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async start() {
    const { t } = this.props;
    try {
      await api.start();
      this.showAlert(t("alerts.updated_parameter"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async changeAlertVolume(volume) {
    const { t } = this.props;
    try {
      await api.postAlertVolume(volume);
      this.showAlert(t("alerts.updated_parameter"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async changeFollowersGoal(goal, html, css) {
    const { t } = this.props;
    try {
      await api.changeFollowersGoal(goal, html, css);
      this.showAlert(t("alerts.updated_parameter"), "success");
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  async sendCode(code) {
    try {
      await api.sendCode(code);
    } catch (err) {
      console.error(err);
      this.showErrorAlert();
      throw err;
    }
  }

  showAlert(alert, alertLevel) {
    const { alertTimeout } = this.state;
    clearTimeout(alertTimeout);
    this.setState({
      alert,
      alertLevel,
      alertTimeout: setTimeout(() => {
        this.setState({ alert: undefined });
      }, 5000),
    });
  }

  showErrorAlert() {
    const { t } = this.props;
    this.showAlert(t("alerts.error"), "warning");
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
    api
      .get(path)
      .then((value) => {
        subjects[path].next(value);
      })
      .catch((err) => {
        console.error(err);
        this.showErrorAlert();
      });
  }

  render() {
    const { children } = this.props;
    const { alert, alertLevel } = this.state;

    return (
      <ApiContext.Provider
        value={{
          achievements: () => this.achievements(),
          lastAchievements: () => this.lastAchievements(),
          viewerAchievements: () => this.viewerAchievements(),
          viewerNames: () => this.viewerNames(),
          started: () => this.started(),
          alertVolume: () => this.alertVolume(),
          followersGoal: () => this.followersGoal(),
          giveAchievement: (achievement, viewer) =>
            this.giveAchievement(achievement, viewer),
          replayAchievement: (achievement, viewerId) =>
            this.replayAchievement(achievement, viewerId),
          testAlert: () => this.testAlert(),
          stop: () => this.stop(),
          start: () => this.start(),
          changeAlertVolume: (volume) => this.changeAlertVolume(volume),
          changeFollowersGoal: (goal, html, css) =>
            this.changeFollowersGoal(goal, html, css),
          showAlert: (msg, lvl) => this.showAlert(msg, lvl),
          alert,
          alertLevel,
          sendCode: (code) => this.sendCode(code),
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
  return function ComponentWithApi(props) {
    return (
      <ApiContextConsumer>
        {(context) => <Component {...props} api={context} />}
      </ApiContextConsumer>
    );
  };
}

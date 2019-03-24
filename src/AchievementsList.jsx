import React from "react";
import { Panel, ListGroup, Glyphicon } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import AchievementWithViewers from "./AchievementWithViewers";
import { withApi } from "./ApiContext";

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

class AchievementsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  componentDidMount() {
    const { api } = this.props;
    const viewerAchievementsObservable = api.viewerAchievements();
    const achievementsObservable = api.achievements();
    viewerAchievementsObservable.subscribe(viewerAchievements => {
      this.sortAndGroup(viewerAchievements, achievementsObservable.value);
    });
    achievementsObservable.subscribe(achievements => {
      this.sortAndGroup(viewerAchievementsObservable.value, achievements);
    });
  }

  sortAndGroup(viewerAchievements, achievements) {
    if (viewerAchievements === undefined || achievements === undefined) {
      return;
    }
    const achievementsWithViewers = Object.entries(achievements)
      .map(([achievementId, achievement]) => ({
        achievement: { id: achievementId, ...achievement },
        viewers: viewerAchievements
          .filter(
            viewerAchievement => viewerAchievement.achievement === achievementId
          )
          .map(viewerAchievement => viewerAchievement.viewerName)
          .sort(sortStrings)
      }))
      .sort((a, b) => a.viewers.length - b.viewers.length);
    this.setState({ achievementsWithViewers, collapsed: true });
  }

  toggleCollapse() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { t } = this.props;
    const { collapsed, achievementsWithViewers } = this.state;
    if (achievementsWithViewers === undefined) {
      return null;
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading
          onClick={() => this.toggleCollapse()}
          style={{ cursor: "pointer" }}
        >
          {collapsed ? (
            <Glyphicon glyph="chevron-right" style={{ marginRight: "5px" }} />
          ) : (
            <Glyphicon glyph="chevron-down" style={{ marginRight: "5px" }} />
          )}
          {t("all_achievements.all_achievements")}
        </Panel.Heading>
        <ListGroup>
          {achievementsWithViewers.map(a => (
            <AchievementWithViewers
              achievement={a.achievement}
              viewers={a.viewers}
              collapsed={collapsed}
              key={a.achievement.id}
            />
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(AchievementsList));

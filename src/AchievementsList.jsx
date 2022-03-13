import React from "react";
import { Panel, ListGroup, Glyphicon } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import AchievementWithViewers from "./AchievementWithViewers";
import { withApi } from "./ApiContext";

class AchievementsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { achievementsWithViewers: [] };
  }

  componentDidMount() {
    const { api } = this.props;
    const viewerAchievementsObservable = api.viewerAchievements();
    const achievementsObservable = api.achievements();
    viewerAchievementsObservable.subscribe((viewerAchievements) => {
      this.sortAndGroup(viewerAchievements, achievementsObservable.value);
    });
    achievementsObservable.subscribe((achievements) => {
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
            (viewerAchievement) =>
              viewerAchievement.achievement === achievementId
          )
          .map((viewerAchievement) => viewerAchievement.viewerName)
          .sort((a, b) => a.localeCompare(b)),
        collapsed: true,
      }))
      .sort(compare);
    this.setState({ achievementsWithViewers });
  }

  toggleCollapseAll() {
    const wantedCollapseState = !this.isAnyCollapsed();
    this.setState({
      achievementsWithViewers: this.state.achievementsWithViewers.map(
        (awv) => ({ ...awv, collapsed: wantedCollapseState })
      ),
    });
  }

  toggleCollapseOne(achievementId) {
    for (const awv of this.state.achievementsWithViewers) {
      if (awv.achievement.id === achievementId) {
        awv.collapsed = !awv.collapsed;
      }
    }
    this.setState({
      achievementsWithViewers: this.state.achievementsWithViewers,
    });
  }

  isAnyCollapsed() {
    return this.state.achievementsWithViewers.some((awv) => awv.collapsed);
  }

  render() {
    const { t } = this.props;
    const { achievementsWithViewers } = this.state;
    if (achievementsWithViewers === undefined) {
      return null;
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading
          onClick={() => this.toggleCollapseAll()}
          style={{ cursor: "pointer" }}
        >
          {this.isAnyCollapsed() ? (
            <Glyphicon glyph="chevron-right" style={{ marginRight: "5px" }} />
          ) : (
            <Glyphicon glyph="chevron-down" style={{ marginRight: "5px" }} />
          )}
          {t("all_achievements.all_achievements")}
        </Panel.Heading>
        <ListGroup>
          {achievementsWithViewers.map((a) => (
            <AchievementWithViewers
              achievement={a.achievement}
              viewers={a.viewers}
              collapsed={a.collapsed}
              onToggleCollapse={() => this.toggleCollapseOne(a.achievement.id)}
              key={a.achievement.id}
            />
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

function compare(awv1, awv2) {
  return (
    awv1.viewers.length - awv2.viewers.length ||
    awv1.achievement.name.localeCompare(awv2.achievement.name)
  );
}

export default withNamespaces()(withApi(AchievementsList));

import React from "react";
import { ListGroupItem, Glyphicon } from "react-bootstrap";
import { withNamespaces } from "react-i18next";

function AchievementWithViewers({
  t,
  achievement,
  viewers,
  collapsed,
  onToggleCollapse,
}) {
  return (
    <ListGroupItem
      key={achievement.id}
      header={
        <AchievementHeader
          achievement={achievement}
          collapsed={collapsed}
          onClick={() => onToggleCollapse()}
        />
      }
    >
      {collapsed ? null : (
        <span id={`achievement-${achievement.id}-viewers`}>
          {viewers.length > 0 ? (
            viewers.map((v) => (
              <span key={v}>
                {v}
                <br />
              </span>
            ))
          ) : (
            <em>{t("all_achievements.nobody_has_it")}</em>
          )}
        </span>
      )}
    </ListGroupItem>
  );
}

// class AchievementWithViewers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { collapsed: props.collapsed };
//   }

//   static getDerivedStateFromProps(props, state) {
//     if (props.collapsed !== state.collapsed) {
//       return { collapsed: props.collapsed };
//     }

//     return null;
//   }

//   toggleCollapse() {
//     this.setState({ collapsed: !this.state.collapsed });
//   }

//   render() {
//     const { viewers, achievement, t } = this.props;
//     const { collapsed } = this.state;
//     return (
//       <ListGroupItem
//         key={achievement.id}
//         header={
//           <AchievementHeader
//             achievement={achievement}
//             collapsed={collapsed}
//             onClick={() => this.toggleCollapse()}
//           />
//         }
//       >
//         {collapsed ? null : (
//           <span id={`achievement-${achievement.id}-viewers`}>
//             {viewers.length > 0 ? (
//               viewers.map((v) => (
//                 <span key={v}>
//                   {v}
//                   <br />
//                 </span>
//               ))
//             ) : (
//               <em>{t("all_achievements.nobody_has_it")}</em>
//             )}
//           </span>
//         )}
//       </ListGroupItem>
//     );
//   }
// }

const AchievementHeader = ({ achievement, collapsed, onClick }) => (
  <div
    className="achievement-header"
    onClick={() => onClick()}
    role="button"
    tabIndex={0}
    onKeyUp={(e) => {
      if (e.keyCode === 32) onClick();
    }}
  >
    {collapsed ? (
      <Glyphicon glyph="chevron-right" style={{ marginRight: "5px" }} />
    ) : (
      <Glyphicon glyph="chevron-down" style={{ marginRight: "5px" }} />
    )}
    <h4 style={{ display: "inline" }}>{achievement.name}</h4>
    <em style={{ color: "grey", marginLeft: "10px" }}>
      {achievement.description}
    </em>
  </div>
);

export default withNamespaces()(AchievementWithViewers);

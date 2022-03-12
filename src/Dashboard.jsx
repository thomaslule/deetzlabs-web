import React from "react";
import { Col, PageHeader, Row } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import AchievementsList from "./AchievementsList";
import AlertVolume from "./AlertVolume";
import { isBroadcaster } from "./auth";
import AuthorizeAppButton from "./AuthorizeAppButton";
import Enabled from "./Enabled";
import FollowersGoal from "./FollowersGoal";
import GiveAchievement from "./GiveAchievement";
import LangSelector from "./LangSelector";
import LastAchievements from "./LastAchievements";
import Logout from "./Logout";
import TestButton from "./TestButton";

const Dashboard = ({ t }) => (
  <div>
    <PageHeader>
      {t("deetzlabs")}
      <Logout className="pull-right" />
      {isBroadcaster() ? <AuthorizeAppButton className="pull-right" /> : <></>}
      <LangSelector className="pull-right" />
    </PageHeader>
    <Row>
      <Col md={6}>
        <Enabled />
        <LastAchievements />
        <TestButton />
        <AlertVolume />
        <GiveAchievement />
        <FollowersGoal />
      </Col>
      <Col md={6}>
        <AchievementsList />
      </Col>
    </Row>
  </div>
);

export default withNamespaces()(Dashboard);

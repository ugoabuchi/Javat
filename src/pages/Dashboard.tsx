import { Avatar, Button, Card, Divider, Tag, Timeline } from "antd";
import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  FileDoneOutlined,
  NotificationOutlined,
  UsergroupAddOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { AppStateType } from "../types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FetchEventLogs, FetchSiteGroups, FetchStats } from "../store/Effects";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Dashboard: React.FC = () => {
  const stats = useSelector(
    (state: AppStateType) => state.mainStore.stats,
    shallowEqual
  );
  const events = useSelector(
    (state: AppStateType) => state.mainStore.eventsLog,
    shallowEqual
  );
  const groups = useSelector(
    (state: AppStateType) => state.mainStore.siteGroups,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchStats());
    dispatch(FetchEventLogs());
    dispatch(FetchSiteGroups());
  }, [dispatch]);


  return (
    <div>
      <PageTitle
        heading="Dashboard"
        subheading="Javat365 Dashboard"
        showCreateAction={false}
        icon={"pe-7s-graph2 icon-gradient bg-happy-itmeo"}
      />

      <div className="page-container">
        <div className="dashboard-page">
          <div className="row1">
            <div>
              <Card title="Data Statistics">
                <div className="stats">
                  <div className="stats-block">
                    <div className="heading">Total Users</div>
                    <div className="data">
                      <div className="icon">
                        <Avatar
                          size={50}
                          icon={<UserAddOutlined />}
                          style={{ backgroundColor: "##ffff" }}
                        />
                      </div>
                      <div className="count">{stats.totalUsers}</div>
                    </div>
                  </div>
                  <div className="stats-block">
                    <div className="heading">Total Groups</div>
                    <div className="data">
                      <div className="icon">
                        <Avatar
                          size={50}
                          icon={<UsergroupAddOutlined />}
                          style={{ backgroundColor: "#FFCE67" }}
                        />
                      </div>
                      <div className="count">{groups.length}</div>
                    </div>
                  </div>
                  <div className="stats-block">
                    <div className="heading">Published content</div>
                    <div className="data">
                      <div className="icon">
                        <Avatar
                          size={50}
                          icon={<FileDoneOutlined />}
                          style={{ backgroundColor: "#b51d5b" }}
                        />
                      </div>
                      <div className="count">{stats.totalContent}</div>
                    </div>
                  </div>
                  <div className="stats-block">
                    <div className="heading">Notifications sent</div>
                    <div className="data">
                      <div className="icon">
                        <Avatar
                          size={50}
                          icon={<NotificationOutlined />}
                          style={{ backgroundColor: "#56CC9D" }}
                        />
                      </div>
                      <div className="count">{stats.totalNotification}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="row2">
            <div>
              <Card title="Activities">
                <PerfectScrollbar style={{ maxHeight: "275px" }}>
                  <Timeline style={{ marginTop: "1rem" }}>
                    {events.length > 0 &&
                      events.map((d) => (
                        <Timeline.Item key={d.id}>
                          <Tag color={"green"}>{d.action.toUpperCase()}</Tag>{" "}
                          {dayjs(d.createdAt).fromNow()} by Admin{" "}
                          <strong>{d.title}</strong>
                        </Timeline.Item>
                      ))}
                  </Timeline>
                </PerfectScrollbar>
                <Divider style={{ margin: "10px 0" }} />
                <div style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="button">
                    View all acitivies
                  </Button>
                </div>
              </Card>
            </div>
            {/* <div>
              <Card title="Current License">
                <h2>Basic FREE</h2>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

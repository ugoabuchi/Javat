import { Table } from "antd";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { FetchEventLogs } from "../store/Effects";
import { AppStateType } from "../types";
import dayjs from "dayjs";

const Activities: React.FC = () => {
  const events = useSelector(
    (state: AppStateType) => state.mainStore.eventsLog,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchEventLogs());
  }, [dispatch]);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
  ];

  const dataSource =
    events.length > 0
      ? events.map((d) => {
        return {
          key: d.id,
          action: d.action.toUpperCase(),
          date: dayjs(d.createdAt).format("MMM DD, YYYY"),
          title: d.title,
        };
      })
      : [];

  return (
    <div>
      <PageTitle
        heading="Activities"
        subheading="Activities performed by users"
        showCreateAction={false}
        icon={"pe-7s-news-paper icon-gradient bg-happy-itmeo"}
      />
      <div className="page-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ x: true }}
          tableLayout={"fixed"}
        />
      </div>
    </div>
  );
};

export default Activities;

import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Button, Table, Tag, Avatar } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../types";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { FetchSiteGroups } from "../store/Effects";
import ButtonGroup from "antd/lib/button/button-group";


const GroupRequests = () => {
  const groups = useSelector(
    (state: AppStateType) => state.mainStore.siteGroups,
    shallowEqual
  );


  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(FetchSiteGroups());
  }, [dispatch]);

  const columns = [
    {
      title: " Group Name",
      dataIndex: "name",
      key: "name",
      width: "100px",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: "350px",
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      width: "75px",
      render: (vis: string) => (
        <span>
          <Tag
            color={
              vis.toUpperCase() === "PUBLIC"
                ? "green"
                : vis.toUpperCase() === "PRIVATE"
                  ? "red"
                  : ""
            }
          >
            {vis.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
      title: "Approval Status",
      dataIndex: "status",
      key: "status",
      width: "350px",
      // render: (sty)

    }
  ];

  const dataSource =
    groups.length > 0
      ? groups.map((d) => {
        return {
          key: d.id,
          created_at: dayjs(d.createdAt).format("MMM DD, YYYY"),
          name: d.displayName,
          desc: d.description,
          visibility: d.visibility,
          status:
            <ButtonGroup>
              <Button
                type="primary"
                htmlType="button"
                style= {{ marginRight: "0px", borderRadius: "5%"}}
              >APPROVE</Button>
              <Button
                type="primary"
                htmlType="button"
                style= {{ marginRight: "0px", borderRadius: "5%"}}

                danger={true}
              >REJECT</Button>
            </ButtonGroup>
        };
      })
      : [];
  console.log(groups)

  return (
    <div>
      <PageTitle
        heading="Group Requests"
        subheading="Group Requests"
        showCreateAction={false}
        icon={"pe-7s-bell icon-gradient bg-happy-itmeo"}
      />

      <div className="page-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ x: true }}
          tableLayout={"fixed"}
          onRow={(rec, index) => {
            return {
              // onClick: () => history.push(`/siteGroups/${rec.key}`),
            };
          }}
        />
      </div>
    </div>
  );
};

export default GroupRequests;

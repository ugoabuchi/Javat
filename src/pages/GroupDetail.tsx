import { Button, Table, Tabs, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {
  FetchFeedItems,
  FetchSiteGroup,
  TogglePublishedContent,
} from "../store/Effects";
import { AppStateType } from "../types";

const GroupDetail: React.FC = () => {
  const siteGroup = useSelector(
    (state: AppStateType) => state.mainStore.siteGroup,
    shallowEqual
  );

  const feedItems = useSelector(
    (state: AppStateType) => state.mainStore.feedItems,
    shallowEqual
  );

  const [publish, setPublish] = useState<boolean>(true);

  const { id } = useParams<any>();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(FetchSiteGroup(id));
      dispatch(FetchFeedItems(id));
    }
  }, [dispatch, id]);

  const viewEditClickHandle = (id: string) => {
    const recIndex = feedItems.findIndex((d) => d.objectId === id);
    if (recIndex !== -1) {
      window.open(
        `${feedItems[recIndex].siteWebUrl}/${feedItems[recIndex].webUrl}`,
        "_blank"
      );
    }
  };

  const confirmClickHandle = (objId: string) => {
    const recIndex: number = feedItems.findIndex((d) => d.objectId === objId);
    const action: string = publish ? "publish" : "unpublish";

    if (recIndex !== -1) {
      dispatch(
        TogglePublishedContent(id, action, objId, feedItems[recIndex].type)
      );
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "75px",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "100px",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: "200px",
    },
    {
      title: "Action",
      key: "action",
      width: "75px",
      render: (text: any, record: any, index: any) => (
        <span>
          <Button.Group>
            <Button
              type="default"
              htmlType="button"
              onClick={() => viewEditClickHandle(record.key)}
            >
              View / Edit
            </Button>
            <Button
              type="primary"
              htmlType="button"
              danger={publish ? false : true}
              onClick={() =>
                Modal.confirm({
                  title: publish ? "Publish" : "Un-Publish",
                  content: `Are you sure you want to ${
                    publish ? "Publish" : "Un-Publish"
                  } ${record.title}? All members in ${
                    siteGroup.displayName
                  } will be notified`,
                  okText: publish ? "Publish & Notify" : "Un-Publish",
                  okButtonProps: {
                    htmlType: "button",
                    danger: publish ? false : true,
                  },
                  onOk: () => confirmClickHandle(record.key),
                })
              }
            >
              {publish ? "Publish" : "Un-Publish"}
            </Button>
          </Button.Group>
        </span>
      ),
    },
  ];

  const published = feedItems
    .filter((d) => d.status === "published")
    .map((d) => {
      return {
        key: d.objectId,
        type: d.pageLayout,
        title: d.title,
        summary: d.summary,
      };
    });

  const unpublished = feedItems
    .filter((d) => d.status === "unpublished")
    .map((d) => {
      return {
        key: d.objectId,
        type: d.pageLayout,
        title: d.title,
        summary: d.summary,
      };
    });

  return (
    <div>
      <PageTitle
        heading={
          siteGroup.displayName.length > 0 ? siteGroup.displayName : "Group"
        }
        groupVisibitliy={siteGroup.visibility}
        subheading="Manage group content."
        editBtnHandle={() => history.push(`/siteGroups/${id}/editGroup`)}
        showCreateAction={siteGroup.isOwner}
        createActionLabel={"Create Content"}
        icon={"pe-7s-folder icon-gradient bg-happy-itmeo"}
        createBtnHanlde={() => history.push(`/siteGroups/${id}/createContent`)}
        importBtnHandle={() => history.push(`/siteGroups/${id}/importContent`)}
        showEditBtn={siteGroup.isOwner}
        showImportBtn={siteGroup.isOwner}
      />
      <div className="page-container">
        <div
          style={{
            padding: "0 1rem 1rem 1rem",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => setPublish(key === "1" ? true : false)}
          >
            <Tabs.TabPane tab="UN-PUBLISHED" key="1">
              <Table
                dataSource={unpublished}
                columns={columns}
                pagination={false}
                size="middle"
                scroll={{ x: true }}
                tableLayout={"fixed"}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="PUBLISHED" key="2">
              <Table
                dataSource={published}
                columns={columns}
                pagination={false}
                size="middle"
                scroll={{ x: true }}
                tableLayout={"fixed"}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;

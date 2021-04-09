import { CloudUploadOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Upload } from "antd";
import { type } from "os";
import React from "react";

interface Props {
  heading: string;
  subheading: string;
  icon?: string;
  iconImage?: any;
  showCreateAction?: boolean;
  createActionLabel?: string;
  createBtnHanlde?: () => void;
  showEditBtn?: boolean;
  editBtnHandle?: () => void;
  showImportBtn?: boolean;
  importBtnHandle?: () => void;
  groupVisibitliy?: string;
  backgroundColor?: string; 
}

const PageTitle: React.FC<Props> = (props) => {
  return (
    <div className="app-page-title" style={{ backgroundColor: props.backgroundColor || "rgba(255, 255, 255, 0.45)"}}>
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          <div
            className={props.icon ? "page-title-icon" : "page-title-icon-image"}
          >
            {props.icon ? (
              <i className={props.icon}></i>
            ) : props.iconImage ? (
              <div className="logo-img-div">
                <img className="logo-img" src={props.iconImage} style={{ margin: "20" }} />
                <Upload className="logo-img-upload" name="logo" action="/upload.do" listType="picture">
                  <Button type="primary" icon={<UploadOutlined />}>Change photo</Button>
                </Upload>
              </div>
              // <div></div>
            ) : null}
          </div>
          <div>
            <Space size="large">
              {props.heading}
              {props.groupVisibitliy ? (
                <Tag
                  color={
                    props.groupVisibitliy.toUpperCase() === "PUBLIC"
                      ? "green"
                      : props.groupVisibitliy.toUpperCase() === "PRIVATE"
                        ? "red"
                        : ""
                  }
                >
                  {props.groupVisibitliy.toUpperCase()}
                </Tag>
              ) : null}
            </Space>
            <div className="page-title-subheading">{props.subheading}</div>
            {props.showEditBtn ? (
              <div className="page-title-actions">
                <Button
                  type="default"
                  htmlType="button"
                  onClick={props.editBtnHandle}
                >
                  <EditOutlined />
                Edit
              </Button>
              </div>
            ) : null}
          </div>
        </div>
        <Button.Group>
          {props.showCreateAction ? (
            <div className="page-title-actions">
              <Button
                type="primary"
                htmlType="button"
                onClick={props.createBtnHanlde}
                style={{ marginRight: "10px" }}
              >
                <PlusOutlined />
                {props.createActionLabel
                  ? props.createActionLabel
                  : "Create New"}
              </Button>
            </div>
          ) : null}

          {props.showImportBtn ? (
            <div className="page-title-actions">
              <Button
                type="default"
                htmlType="button"
                onClick={props.importBtnHandle}
              // style={{ backgroundColor: "#FFCE67" }}
              >
                <CloudUploadOutlined /> Import Content
              </Button>
            </div>
          ) : null}
        </Button.Group>
      </div>
    </div>
  );
};

export default PageTitle;

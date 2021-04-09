import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { loadingAction } from "../store/Actions";
import { CreateGroupContent, FetchSiteGroup } from "../store/Effects";
import { AppStateType } from "../types";

const GroupContentForm: React.FC = () => {
  const [values, setValues] = useState<{ title: string; body: string }>({
    body: "",
    title: "",
  });

  const siteGroup = useSelector(
    (state: AppStateType) => state.mainStore.siteGroup,
    shallowEqual
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams<any>();

  useEffect(() => {
    if (id) {
      dispatch(FetchSiteGroup(id));
      dispatch(loadingAction(false));
    }
  }, [dispatch, id]);

  const createBtnHanlde = () => {
    dispatch(CreateGroupContent(id, values, history, `/siteGroups/${id}`));
  };

  const EditorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const EditFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <PageTitle
        heading={
          siteGroup.displayName.length > 0
            ? `Create Content in ${siteGroup.displayName}`
            : "Create Content in Group"
        }
        groupVisibitliy={siteGroup.visibility}
        subheading="Manage group content."
        showCreateAction={false}
        icon={"pe-7s-folder icon-gradient bg-happy-itmeo"}
      />
      <div className="page-container">
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        >
          <h4>Title</h4>
          <Input
            size="large"
            placeholder="Content Title"
            name="title"
            id="title"
            value={values.title}
            onChange={(event) =>
              setValues({ ...values, title: event.target.value })
            }
            style={{ border: "1px solid #ccc" }}
          />
          <br />
          <br />
          <h4>Body</h4>
          <ReactQuill
            theme="snow"
            value={values.body}
            id="body"
            onChange={(html) => setValues({ ...values, body: html })}
            modules={EditorModules}
            formats={EditFormats}
          />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button.Group>
              <Button
                type="primary"
                htmlType="button"
                onClick={createBtnHanlde}
              >
                Create
              </Button>
              <Button
                type="default"
                htmlType="button"
                danger={true}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </Button.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupContentForm;

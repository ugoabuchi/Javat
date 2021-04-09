import { Button, Collapse, Input, Radio, Checkbox, Row, Col } from "antd";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { AppStateType } from "../types";
import '../styles/index.scss'

const GroupImportContentForm: React.FC = () => {
  const siteGroup = useSelector(
    (state: AppStateType) => state.mainStore.siteGroup,
    shallowEqual
  );

  const history = useHistory();

  const { id } = useParams<any>();

  console.log(id);

  return (
    <div className="import-content-form">
      <PageTitle
        heading={
          siteGroup.displayName.length > 0
            ? `Import Content in ${siteGroup.displayName}`
            : "Import Content in Group"
        }
        groupVisibitliy={siteGroup.visibility}
        subheading="Import conent in group"
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
          <div className="form">
            <div className="label">Enter Site URL: </div>
            <div className="field">
              <Input name="siteUrl" type="url" style={{ borderRadius: "4px" }} />
            </div>
            <div className="btn">
              <Button htmlType="button">CONNECT</Button>
            </div>
          </div>
          <br />
          <h3 style={{ textAlign: "center" }}>SELECT CONTENTS TO PUBLISH</h3>
          <br />
          <div className="data-select">
            {/* <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
              <Collapse.Panel header="Site Pages" key="1">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    Test1.aspx
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    Test2.aspx
                  </Radio>
                  <Radio className="radio-style" value={3}>
                    Test3.aspx
                  </Radio>
                  <Radio className="radio-style" value={4}>
                    Test4.aspx
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>

              <Collapse.Panel header="Yemi Pages" key="2">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    TestYemi1.aspx
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    TestYemi2.aspx
                  </Radio>
                  <Radio className="radio-style" value={3}>
                    TestYemi3.aspx
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>

              <Collapse.Panel header="Pixel Library" key="3">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    Test.png
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    TestIne.doc
                  </Radio>
                  <Radio className="radio-style" value={3}>
                    Test.xml
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>

              <Collapse.Panel header="Shared Libarary" key="4">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    Sp.jpg
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    Sp1.txt
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>

              <Collapse.Panel header="Yemi" key="5">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    Test.doc
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    Test.txt
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>

              <Collapse.Panel header="Apex Folder" key="6">
                <Radio.Group>
                  <Radio className="radio-style" value={1}>
                    Apet1.doc
                  </Radio>
                  <Radio className="radio-style" value={2}>
                    Apet2.doc
                  </Radio>
                </Radio.Group>
              </Collapse.Panel>
            </Collapse> */}

            <Row gutter={[16, 16]} className="group-import-content">
              <Col span={12} className="group-import-content-col1">
                <div className="gic-top-col1">PAGES</div>
                <div>
                  <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                    <Collapse.Panel header="Site Pages" key="1">
                      <Checkbox.Group>
                        <Checkbox className="radio-style" value={1}>
                          Test1.aspx
                  </Checkbox>
                        <Checkbox className="radio-style" value={2}>
                          Test2.aspx
                  </Checkbox>
                        <Checkbox className="radio-style" value={3}>
                          Test3.aspx
                  </Checkbox>
                        <Checkbox className="radio-style" value={4}>
                          Test4.aspx
                  </Checkbox>
                      </Checkbox.Group>
                    </Collapse.Panel>

                    <Collapse.Panel header="Yemi Pages" key="2">
                      <Checkbox.Group>
                        <Checkbox className="radio-style" value={1}>
                          TestYemi1.aspx
                  </Checkbox>
                        <Checkbox className="radio-style" value={2}>
                          TestYemi2.aspx
                  </Checkbox>
                        <Checkbox className="radio-style" value={3}>
                          TestYemi3.aspx
                  </Checkbox>
                      </Checkbox.Group>
                    </Collapse.Panel>
                  </Collapse>


                </div>

              </Col>
              <Col span={12} className="group-import-content-col2">
                <div className="gic-top-col2">DOCUMENT LIBRARIES</div>
                <div>
                  <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>

                    <Collapse.Panel header="Pixel Library" key="3">
                      <Radio.Group>
                        <Radio className="radio-style" value={1}>
                          Test.png
                  </Radio>
                        <Radio className="radio-style" value={2}>
                          TestIne.doc
                  </Radio>
                        <Radio className="radio-style" value={3}>
                          Test.xml
                  </Radio>
                      </Radio.Group>
                    </Collapse.Panel>

                    <Collapse.Panel header="Shared Libarary" key="4">
                      <Radio.Group>
                        <Radio className="radio-style" value={1}>
                          Sp.jpg
                  </Radio>
                        <Radio className="radio-style" value={2}>
                          Sp1.txt
                  </Radio>
                      </Radio.Group>
                    </Collapse.Panel>

                  </Collapse>
                </div>

              </Col>
            </Row>

            <Row className="gic-publish-buttons">
              <Col>
                <div className="group-import-content-pub-btn">
                  <Button type="primary" htmlType="button">
                    Publish Now
                </Button>
                </div>
              </Col>
              <Col>
                <div className="group-import-content-schedule-pub-btn">
                  <Button type="primary" htmlType="button">
                    Schedule Publish
                </Button>
                </div>
              </Col>
            </Row>

          </div>
          <br />
          <div style={{ textAlign: "right" }}>
            {/* <Button.Group> */}


            {/* <Button
                type="default"
                htmlType="button"
                onClick={() => history.goBack()}
              >
                Cancel
              </Button> */}
            {/* </Button.Group> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupImportContentForm;

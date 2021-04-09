import React from "react";
import PageTitle from "../components/PageTitle";

const Settings: React.FC = () => {
  return (
    <div>
      <PageTitle
        heading="Settings"
        subheading="Configure you tenant"
        showCreateAction={false}
        icon={"pe-7s-settings icon-gradient bg-happy-itmeo"}
      />
    </div>
  );
};

export default Settings;

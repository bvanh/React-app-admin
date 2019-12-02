import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";

const Back = ({ history }) =>
  history.length > 1 && (
    <Button type="danger" style={{ margin: "0 8px" }} onClick={history.goBack}>
      Back
    </Button>
  );

export default withRouter(Back);

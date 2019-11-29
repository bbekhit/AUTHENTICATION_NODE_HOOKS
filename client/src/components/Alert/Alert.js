import React from "react";
import { connect } from "react-redux";

const Alert = props =>
  props.alert !== null && (
    <div className={`m-4 alert alert-${props.alert.alertType}`}>
      {props.alert.msg}
    </div>
  );

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);

import React from "react";
import StepTwo from "../Registration/StepTwo";

export default () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <StepTwo
            notificationMailSendData={[
              {display: "Send mail now", value: 'now'},
              {display: "Send empty mail to my self", value: 'self'},
              {display: "Not now", value: 'no'}
            ]}
          />
        </div>
      </div>
    </div>
  )
}

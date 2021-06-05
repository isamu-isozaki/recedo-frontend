import { Form } from "react-bootstrap";
import { Button, InputGroup, Nav } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { updateUser } from 'app/store/auth';
import { loadIncomingMail } from 'app/store/mail/incomingMail';
import { loadMasterMail } from 'app/store/mail/masterMail';
import { loadUserMail } from 'app/store/mail/userMail';
import { connect } from 'react-redux';

const StepTwo = ({
  updateUser,
  loadIncomingMail,
  loadMasterMail,
  loadUserMail,
}) => {
  /*
   * <- props parameters ->
   * @param notificationMailSendData: available notification mail send types
   * */

  const availableMailNotificationOptions = [
    {display: "Send mail now", value: 'now'},
    {display: "Send empty mail to my self", value: 'self'},
    {display: "Not now", value: 'no'}
  ];
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [type, setType] = useState("");

  const txtSubject = useRef(null);
  const txtBody = useRef(null);

  const updateAndGetUser = () => {
    updateUser({isRegistered: true});
    loadIncomingMail();
    loadMasterMail();
    loadUserMail();
  }
  const goNext = () => {
    if (type === "") {
      alert("Please select Mail Options");
    } else {
      if (type === "now" || type === "self") {
        if (!subject) {
          alert("Please Enter Subject");
          txtSubject.current.focus();
        } else if (!emailBody) {
          alert("Please Enter Body");
          txtBody.current.focus();
        } else {
          updateAndGetUser();
        }
      } else {
        updateAndGetUser();
      }
    }

  };

  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">Email Settings</div>
      <div className="card-body">
        <Form>
          <p>First send notification mail</p>
          <Form.Group>
            {availableMailNotificationOptions.map((item, index) => (
              <Form.Check
                key={"notification-mail-send-key-" + index}
                type="radio"
                name="notification-mail"
                value={item.value}
                label={item.display}
                id={"notification-mail-send-radio-" + index}
                onChange={e => setType(e.target.value)}
              />
            ))}
          </Form.Group>
          {type !== "no" && (
            <>
              <Form.Group>
                <Form.Label htmlFor="emailAddresses">
                  Enter email addresses to send to
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control as="textarea" rows={3} />
                </InputGroup>
              </Form.Group>
              <div className="col-xs-6 offset-xs-3">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Copy from template</Form.Label>
                  <Form.Control as="select" custom>
                    <option>Change mail notification</option>
                    <option>Change 2</option>
                    <option>Change 3</option>
                    <option>Change 4</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <Form.Group controlId="mail-subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  placeholder="Subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  ref={txtSubject}
                />
                <div className="invalid-feedback">This field is required</div>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="emailBody">Email Body</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                    rows={3}
                    ref={txtBody}
                  />
                  <div className="invalid-feedback">This field is required</div>
                </InputGroup>
              </Form.Group>
            </>
          )}
        </Form>
      </div>

      <div className="card-footer">
        <div className="text-center">
          <Button variant="success" onClick={goNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
export default connect(
  null,
  {
    updateUser,
    loadIncomingMail,
    loadMasterMail,
    loadUserMail,
  }
)(StepTwo);
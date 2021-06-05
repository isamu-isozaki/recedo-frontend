import React from "react";
import {FormControl, InputGroup, Button, Form} from "react-bootstrap";
import KiaraEmailInput from "app/components/KiaraEmailInput";
import SelectOption from "app/components/SelectOption";
import TranslationLayout from "app/components/TranslationLayout";


export default () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-6 offset-sm-3">
        <div className="card">
          <div className="card-header bg-secondary text-white">
            Email Settings
          </div>
          <div className="card-body">
            <Form>
              <Form.Group>
                <Form.Label htmlFor="emaillAddress">
                  Your email address
                </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    id="emaillAddress"
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />
                </InputGroup>
              </Form.Group>
              <KiaraEmailInput/>

              <h3>Translation Settings</h3>
              <SelectOption
                label="Select your language for receiving and sending emails"
                optionData={[
                  {display: "English", value: "english"},
                  {display: "Japanese", value: "japanese"},
                  {display: "Bangla", value: "bangla"},
                ]}
                onChange={e => console.log(e.target.value)}
              />
              {/*<TranslationLayout
                positionData={availableTransLocs}
                value={translationLoc}
                onChange={setTranslationLoc}
              />*/}
            </Form>
            <br/>
            <br/>
          </div>
          <div className="card-footer">
            <Button variant="primary" style={{float: "right"}}>
              Send test mail
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);



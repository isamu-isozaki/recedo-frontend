import React from "react";
import { FormControl, InputGroup, Button, Form } from "react-bootstrap";
import SelectOption from "app/components/SelectOption";
import TranslationLayout from "app/components/TranslationLayout"

export default props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Translation Settings
            </div>
            <div className="card-body">
              <Form>
                {/*<TranslationLayout
                  positionData={availableTransLocs}
                  value={translationLoc}
                  onChange={setTranslationLoc}
                />*/}

                <SelectOption
                  label="Select your language for receiving and sending emails"
                  optionData={[
                    {display: "English", value: "english"},
                    {display: "Japanese", value: "japanese"},
                    {display: "Bangla", value: "bangla"},
                  ]}
                  onChange={e => console.log(e.target.value)}
                />
                <Form.Group>
                  <Form.Label htmlFor="emaillAddress">
                    Text before original text
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      id="textBeforeOriginalText"
                      placeholder="Text before original text"
                      aria-label="Text before original text"
                    />
                  </InputGroup>
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Label htmlFor="emaillAddress">
                    Text before translation text
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      id="texBeforeTranslationText"
                      placeholder="Text before translation text"
                      aria-label="Text before translation text"
                    />
                  </InputGroup>
                </Form.Group>
                <Button variant="info" style={{ float: "right" }}>
                  Send test mail
                </Button>
              </Form>
              <br />
              <br />
              <Button variant="primary">Next</Button>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


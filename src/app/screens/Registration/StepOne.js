import {Form} from "react-bootstrap";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {getLangNameFromCode, isValidMailPrefix, validateEmail} from "../util";
import React, {useState, useEffect} from "react";
import TextInput from 'app/components/TextInput';
import SelectOption from "app/components/SelectOption";
import TranslationLayout from "app/components/TranslationLayout";
import { updateUser } from 'app/store/auth';
import { createUserMail } from 'app/store/mail/userMail';
import { connect } from 'react-redux';



const StepOne = ({
  user,
  domains,
  updateUser,
  createUserMail,
  gotoNextStep
}) => {
  /*
  * <- props parameters ->
  * @param gotoNextStep: go to step 2
  * */
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(isValidMailPrefix(user.name));
  const [email, setEmail] = useState(user.email);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [translationLoc, setTranslationLoc] = useState(user.translationLoc);
  const [lang, setLang] = useState(user.lang);
  
  const nameUpdate = e => {
    setName(e.target.value);
    setIsValidName(validateEmail(e.target.value));
  }
  const emailUpdate = e => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  }
  const submit = async () => {
    if(name && email && translationLoc && lang && isValidEmail && isValidName) {
      await createUserMail({mailAddress: name, privateMailAddress: email});
      await updateUser({name: user.name, email, translationLoc, lang});
      gotoNextStep();
    }
  }
  const availableLangs = ['ja', 'ko', 'zh-CN', 'zh-TW', 'en'];
  const availableTransLocs = [
    {display: "on top", value: 'top'},
    {display: "only", value: 'only'},
    {display: "on bottom", value: 'bottom'}
  ];

  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">Email Settings</div>
      <div className="card-body">
        <Form>
          <Form.Group>
            <Form.Label htmlFor="emailAddress">
              Your email address
            </Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                id="emailAddress"
                placeholder="Email Address"
                value={email}
                onChange={emailUpdate}
                className={isValidEmail === false ? 'is-invalid' : null}
              />
              <div className="invalid-feedback">Please enter a valid email</div>
            </InputGroup>
            <TextInput
              label={'Kiara Mail'}
              text={name}
              onChange={nameUpdate}
              fixedDomains={domains}
            />
          </Form.Group>

          <h3>Translation Settings</h3>
          <SelectOption
            label="Select your language for receiving and sending emails"
            optionData={availableLangs.map(
              item => ({
                display: getLangNameFromCode(item).name,
                value: item,
              })
            )}
            value={lang}
            onChange={e => setLang(e.target.value)}
          />
          <TranslationLayout
            positionData={availableTransLocs}
            value={translationLoc}
            onChange={e => setTranslationLoc(e.target.value)}
          />
        </Form>
        <div className="d-flex justify-content-end">
          <Button variant="primary">
            Send test email
          </Button>
        </div>
      </div>
      <div className="card-footer">
        <div className="text-center">
          <Button variant="success" onClick={submit}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    domains: state.domains,
  }
}

export default connect(
  mapStateToProps,
  {updateUser, createUserMail}
)(StepOne);
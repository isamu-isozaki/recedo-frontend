import React, {useState} from 'react';
import { updateUser } from 'app/store/auth';
import { connect } from 'react-redux';
// import EditableText from 'app/components/EditableText';
// import DropdownEditable from 'app/components/DropdownEditable';
import {validateEmail} from 'app/screens/util';
// import {getLangNameFromCode, getCodeFromLangName} from './util';

import {FormControl, InputGroup, Button, Form, Carousel} from "react-bootstrap";
import StepOne from "../Registration/StepOne";
import StepTwo from "../Registration/StepTwo";


/**
 *
 * @param {object} param0
 * user {object}. Current user settings
 * updateUser {function}. Updates user settings
 * Returns Setting scomponent to see and modify settings
 */
function Settings({user, updateUser, setCookie}) {
  const [kiaraEmailUsername, setKiaraEmailUsername] = useState('');
  const [email, setEmail] = useState(user.email);
  const [translationLoc, setTranslationLoc] = useState(user.translationLoc);
  const [lang, setLang] = useState(user.lang);

  const availableLangs = ['ja', 'ko', 'zh-CN', 'zh-TW', 'en'];
  const availableTransLocs = [
    {display: "on top", value: 'top'},
    {display: "only", value: 'only'},
    {display: "on bottom", value: 'bottom'}
  ];
  const availableMailNotificationOptions = [
    {display: "Send mail now", value: 'now'},
    {display: "Send empty mail to my self", value: 'self'},
    {display: "Not now", value: 'no'}
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(parseInt(selectedIndex));
  };

  const updateUserDataAndGoStepTwo = () => {
    updateUser({
      email,
      kiaraEmailUsername,
      translationLoc,
      lang,
    });

    setCarouselIndex(1);
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <Carousel
              controls={false}
              interval={null}
              indicators={false}
              keyboard={false}
              activeIndex={carouselIndex}
              onSelect={handleSelect}
            >
              <Carousel.Item>
                <StepOne
                  email={email}
                  setEmail={setEmail}
                  kiaraEmailUsername={kiaraEmailUsername}
                  setKiaraEmailUsername={setKiaraEmailUsername}
                  availableLangs={availableLangs}
                  lang={lang}
                  setLang={setLang}
                  availableTransLocs={availableTransLocs}
                  translationLoc={translationLoc}
                  setTranslationLoc={setTranslationLoc}
                  goNextStep={updateUserDataAndGoStepTwo}
                />
              </Carousel.Item>
              <Carousel.Item>
                <StepTwo
                  notificationMailSendData={availableMailNotificationOptions}
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {user: state.auth.user}
}

export default connect(
  mapStateToProps,
  {updateUser}
)(Settings);

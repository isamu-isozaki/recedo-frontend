/**
 * Author: Isamu Isozaki
 */
import React, {useState} from 'react';
import { updateUser } from 'app/store/auth';
import { connect } from 'react-redux';
import EditableText from 'app/components/EditableText';
import DropdownEditable from 'app/components/DropdownEditable';
import {validateEmail} from 'app/screens/util';
import {getLangNameFromCode, getCodeFromLangName} from './util';

/**
 * 
 * @param {object} param0 
 * user {object}. Current user settings
 * updateUser {function}. Updates user settings
 * Returns Setting scomponent to see and modify settings
 */
function Settings({user, updateUser}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [translationLoc, setTranslationLoc] = useState(user.translationLoc);
  const [userType, setUserType] = useState(user.type);
  const [lang, setLang] = useState(user.lang);
  const [textBeforeOriginal, setTextBeforeOriginal] = useState(user.textBeforeOriginal);
  const [textBeforeTranslated, setTextBeforeTranslated] = useState(user.textBeforeTranslated);

  const availableLangs = ['ja', 'ko', 'zh-CN', 'zh-TW', 'en'];
  //Thinking about using a collection to store languages will leave as this for now
  const nameUpdate = () => {
    updateUser({name});
  }

  const emailUpdate = () => {
    if(validateEmail(email)) {
      updateUser({email});
    } else {
      setEmail(user.email);
    }
  }
  const translationLocUpdate = () => {
    updateUser({translationLoc});
  }
  const userTypeUpdate = () => {
    updateUser({type: userType});
  }
  const langUpdate = () => {
    updateUser({lang});
  }
  const textBeforeOriginalUpdate = () => {
    updateUser({textBeforeOriginal});
  }
  const textBeforeTranslatedUpdate = () => {
    updateUser({textBeforeTranslated})
  }
  return (
      <div className="container">
        <div className="row">
          <div>Welcome</div>
        </div>
        <EditableText
          label={"Username"}
          onChange={e => setName(e.target.value)}
          text={name}
          onUpdate={nameUpdate}
        />
        <EditableText
          label={'Email'}
          onChange={e => setEmail(e.target.value)}
          text={email}
          onUpdate={emailUpdate}
        />
        <DropdownEditable 
          label={'Translation Location'}
          value={translationLoc}
          onChange={e => setTranslationLoc(e.target.value)}
          dropdownOptions={['top', 'bottom', 'only']} 
          onUpdate={translationLocUpdate}/>
        <DropdownEditable 
          label={'User Type'}
          value={userType}
          onChange={e => setUserType(e.target.value)}
          dropdownOptions={['admin', 'user', 'free']} 
          onUpdate={userTypeUpdate}/>
        <DropdownEditable 
          label={'Language'}
          value={getLangNameFromCode(lang).name}
          onChange={e => setLang(getCodeFromLangName(e.target.value))}
          dropdownOptions={availableLangs.map(code => getLangNameFromCode(code).name)} 
          onUpdate={langUpdate}/>
        <EditableText
          label={'Additional Text Before Original Text'}
          onChange={e => setTextBeforeOriginal(e.target.value)}
          text={textBeforeOriginal}
          onUpdate={textBeforeOriginalUpdate}/>
        <EditableText
          label={'Additional Text Before Translation'}
          onChange={e => setTextBeforeTranslated(e.target.value)}
          text={textBeforeTranslated}
          onUpdate={textBeforeTranslatedUpdate}
        />
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

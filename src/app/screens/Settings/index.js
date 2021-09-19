import React, {useState} from 'react';
import { updateUser } from 'app/store/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} param0
 * user {object}. Current user settings
 * updateUser {function}. Updates user settings
 * Returns Setting scomponent to see and modify settings
 */
function Settings({user, updateUser}) {
  return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            Settings
          </div>
        </div>
      </div>
  );
}

Settings.propTypes = {
  user: PropTypes.any,
  updateUser: PropTypes.func,
}
const mapStateToProps = (state) => {
  return {user: state.auth.user}
}

export default connect(
  mapStateToProps,
  {updateUser}
)(Settings);

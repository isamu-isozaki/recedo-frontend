/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 */
import React from 'react';
import {Button} from 'react-bootstrap';

/**
 * 
 * @param {object} param0 
 * onPress {function}. Called when button is pressed
 * isEnabled {boolean}.
 * isLoading {boolean}.
 * test {string}. String in button
 * otherProps {object}. Props of bootstrap button
 * Makes button
 */
const CustomButton = ({
  onPress,
  isEnabled,
  isLoading,
  text,
  ...otherProps
}) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Button variant="outline-secondary"
          onClick={onButtonPress}
          {...otherProps}
          >
          {isLoading && (
            <div />
          )}
          {!isLoading && <div>{text}</div>}
        </Button>
      </div>
    </div>
  );
};

CustomButton.defaultProps = {
  onPress: () => null,
  isEnabled: true,
  isLoading: false,
};


export default CustomButton;

//Based on https://github.com/mmazzarolo/react-native-login-animation-example
import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({
  onPress,
  isEnabled,
  isLoading,
  text,
  ...otherProps
}) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

  return (
    <div className="row">
      <div className="col-md-12">
        <Button variant="success" block onClick={onButtonPress} {...otherProps}>
          <div>{text}</div>
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

// const styles = StyleSheet.create({
//   button: {
//     height: 42,
//     borderWidth: 1,
//     borderRadius: 3,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//   },
//   spinner: {
//     height: 26,
//   },
//   text: {
//     textAlign: 'center',
//     fontWeight: '400',
//     color: 'white',
//   },
// });

export default CustomButton;

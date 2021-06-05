import React from "react";
import { Button } from "react-bootstrap";

import { SocialIcon } from "react-social-icons";
import { size } from "lodash";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(props) {
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      style={{ backgroundColor: "#3b5998", width: "100%" }}
      disabled={isLoading}
      block
      onClick={!isLoading ? props.onClick2 : () => null}
    >
      <SocialIcon
        network="facebook"
        bgColor="#FFFFFF"
        style={{ height: 25, width: 25 }}
      />
      {isLoading ? "Loading…" : " Continue With Facebook"}
    </Button>
  );
}

export default LoadingButton;

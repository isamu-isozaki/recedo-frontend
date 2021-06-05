import React from "react";
import { Button } from "react-bootstrap";

import { SocialIcon } from "react-social-icons";

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
      style={{ bgColor: "#00acee", width: "100%" }}
      block
      disabled={isLoading}
      onClick={!isLoading ? props.onClick2 : () => null}
    >
      <SocialIcon
        network="twitter"
        bgColor="#FFFFFF"
        style={{ height: 25, width: 25 }}
      />
      {isLoading ? "Loading…" : " Continue With Twitter"}
    </Button>
  );
}

export default LoadingButton;

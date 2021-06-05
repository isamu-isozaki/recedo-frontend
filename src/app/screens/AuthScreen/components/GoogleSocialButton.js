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
      style={{ width: "100%",}}
      variant="danger"
      block
      disabled={isLoading}
      onClick={!isLoading ? props.onClick2 : () => null}
    >
      <SocialIcon
        network="google"
        bgColor="#FFFFFF"
        style={{ height: 25, width: 25,}}
      />
      {isLoading ? "Loading…" : " Continue With Google"}
    </Button>
  );
}

export default LoadingButton;

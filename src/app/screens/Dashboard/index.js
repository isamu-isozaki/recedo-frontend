import React from 'react';
import {Button, Card} from "react-bootstrap";
import { useHistory } from "react-router-dom";



export default props => {
  const history = useHistory();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h3>Recent Activities</h3>
            <button className="btn btn-secondary">
              Send Notification
            </button>
          </div>
          <Card className="border border-dark">
            <Card.Body>
              <Card.Text>
               Recent activities
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 offset-md-3 mb-4">
          <h3>Your settings</h3>
          <Card className="border border-dark">
            <Card.Body>
              <Card.Text>
                Your settings
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 offset-md-3">
          <h3>Payment history</h3>
          <Card className="border border-dark">
            <Card.Body>
              <Card.Text>
                payment history
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

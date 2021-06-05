import React from "react";
import { FormControl, InputGroup, Button, Form } from "react-bootstrap";

function ClientEmailSettings(props) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                Per Client Email Settings
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" placeholder="Search" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label>XXXX@XXXXXXX English(XXXX@kiara.app)</label>
                  </div>
                  <div className="col-sm-6">
                    <select className="form-control">
                      <option>English</option>
                      <option>Japanese</option>
                      <option>Hindi</option>
                      <option>Urdu</option>
                      <option>Bangla</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label>XXXX@XXXXXXX English(XXXX@kiara.app)</label>
                  </div>
                  <div className="col-sm-6">
                    <select className="form-control">
                      <option value="selected">None</option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </div>
  );
}

export default ClientEmailSettings;

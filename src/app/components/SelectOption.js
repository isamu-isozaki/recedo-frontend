import React from 'react';
import {Form} from 'react-bootstrap'


export default (
  {
    label,
    optionData,
    value,
    onChange,
  }
) => (
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>{label}</Form.Label>
    <Form.Control as="select" custom onChange={onChange} value={value}>
      {optionData.map((item, index) => (
        <option key={"form-option-" + index} value={item.value}>{item.display}</option>
      ))}
    </Form.Control>
  </Form.Group>
)

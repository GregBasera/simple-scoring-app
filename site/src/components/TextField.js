import React from "react";

export default function TextField(props) {
  return (
    <div className="form-floating mb-3">
      <input type="text" className="form-control" id={props.for} placeholder={props.hlder} value={props.v} onChange={props.c} readOnly={props.readOnly ? true : false} />
      <label htmlFor={props.for}>{props.label}</label>
    </div>
  );
}

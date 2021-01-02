import React, { useState } from "react";
import Axios from "axios";
import TextField from "./TextField";
import { AddCandidate } from "../endpoints";

export default function UpdateForm(props) {
  const [cand, setCand] = useState({ ...props.cand, panel: "", score: "" });
  const [staging, setStaging] = useState({});
  const [sendStatus, setSendStatus] = useState("");

  const handleChange = (e) => {
    setCand({ ...cand, [e.target.placeholder]: e.target.value });
  };
  const handleReview = () => {
    let stage = {};
    ["readable_ID", "name", "applying_for", "panel", "score"].forEach((q) => {
      if (cand[q] !== "") {
        stage[q] = cand[q];
      }
    });
    setStaging(stage);
  };
  const handleSend = () => {
    Axios.post(AddCandidate, staging)
      .then((res) => {
        setSendStatus(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <TextField for="candName" label="Candidate name" hlder="name" v={cand.name} c={handleChange} readOnly />
      <TextField for="candAppFor" label="Applying for" hlder="applying_for" v={cand.applying_for} c={handleChange} readOnly />
      <TextField for="candPanel" label="Panel name" hlder="panel" v={cand.panel} c={handleChange} />
      <div className="form-floating mb-3">
        <input type="number" className="form-control" id="score" placeholder="score" value={cand.score} onChange={handleChange} />
        <label htmlFor="score">Score</label>
      </div>

      <div className="d-grid gap-2 mb-3">
        <button className="btn btn-info" type="button" onClick={handleReview}>
          Preview
        </button>
      </div>

      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="preview"
          id="previewArea"
          readOnly
          style={{ height: "180px" }}
          defaultValue={Object.entries(staging).map((p) => `\n${p[0]}: ${p[1]}`)}></textarea>
        <label htmlFor="previewArea">Preview</label>
      </div>

      <div className="d-grid gap-2 mt-3">
        <button className="btn btn-info" type="button" onClick={handleSend}>
          Send
        </button>
      </div>
      {sendStatus === "" ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border spinner-border-sm" role="status"></div>
        </div>
      ) : (
        sendStatus.toString()
      )}
    </React.Fragment>
  );
}

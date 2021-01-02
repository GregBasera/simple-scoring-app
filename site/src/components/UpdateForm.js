import React, { useState } from "react";
import TextField from "./TextField";

export default function UpdateForm(props) {
  const [cand, setCand] = useState({ ...props.cand, panel: "", score: "" });
  const [staging, setStaging] = useState({});

  const handleChange = (e) => {
    setCand({ ...cand, [e.target.placeholder]: e.target.value });
  };
  const handleReview = () => {
    let stage = {};
    ["readable_ID", "name", "applying_for", "panel", "score"].forEach((q) => (stage[q] = cand[q]));
    setStaging(stage);
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
          style={{ height: "150px" }}
          defaultValue={Object.entries(staging).map((p) => `\n${p[0]}: ${p[1]}`)}></textarea>
        <label htmlFor="previewArea">Preview</label>
      </div>

      <div className="d-grid gap-2 mt-3">
        <button className="btn btn-info" type="button" onClick={handleReview}>
          Send
        </button>
      </div>
      {/* lul */}
    </React.Fragment>
  );
}

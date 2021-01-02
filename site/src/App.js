import { useState } from "react";
import Axios from "axios";

import { Checkout } from "./endpoints";
import UpdateForm from "./components/UpdateForm";

function App() {
  const [id, setId] = useState("");
  const [candidate, setCandidate] = useState({});

  const handleIDchange = (e) => {
    setId(e.target.value);
  };
  const checkClicked = () => {
    Axios.get(Checkout + `?readable_ID=${id}`)
      .then((res) => {
        setCandidate(res.data.length !== 0 ? res.data[0] : {});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container my-3">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="ID here" value={id} onChange={handleIDchange} />
        <button className="btn btn-outline-info" type="button" onClick={checkClicked}>
          Check
        </button>
      </div>

      <hr />
      {Object.entries(candidate).length === 0 ? (
        <div className="alert alert-danger">No such Candidate. Please check for a valid Candidate ID</div>
      ) : (
        <UpdateForm cand={candidate} />
      )}
    </div>
  );
}

export default App;

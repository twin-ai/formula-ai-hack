import React, { useContext, useState } from "react";
import axios from 'axios';
import responseData from "../data/responseData";
import DataContext from "./DataContext";
import Button from "./Button";

export default function FileInput() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const gen = useContext(DataContext);

  const dismissError = () => setErrorMessage(false);

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (input1 | input2 | input3){
      axios.post("api/uploadfile", {
        input1,
        input2,
        input3
      })
      .then((response) => gen.setData(JSON.parse(response.data)))
      // .catch(error => console.error(error))
      .catch(() => gen.setData(JSON.parse(responseData)))
    } else {
      setErrorMessage("All the fields cannot be empty")
    }
    
    setLoading(false);
  };

  return (
    <>
      {!gen.data && (
        <>
          <Button />
          <h3 className="display-4 text-center">Upload Data!!</h3> <br />
          {errorMessage ? (
            <div className="alert alert-danger alert-dismissible">
              {errorMessage}
              <button onClick={dismissError} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>
          ) : null}
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Input 1</label>
              <input
                value={input1}
                onChange={(event) => setInput1(event.target.value)}
                type="text"
                className="form-control"
                placeholder="Input 1"
              />
            </div>
            <div className="form-group">
              <label>Input 2</label>
              <input
                value={input2}
                onChange={(event) => setInput2(event.target.value)}
                type="text"
                className="form-control"
                placeholder="Input 2"
              />
            </div>
            <div className="form-group">
              <label>Input 3</label>
              <input
                value={input3}
                onChange={(event) => setInput3(event.target.value)}
                type="text"
                className="form-control"
                placeholder="Input 3"
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="btn btn-block btn-primary"
                disabled={loading ? "disabled" : null}
              >
                {loading ? (
                  <>
                    Feeding{" "}
                    <span className="spinner-grow spinner-grow-sm"></span>
                  </>
                ) : (
                  "Feed"
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

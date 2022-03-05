import "./css/App.css";
import "./css/Button.css";
import FileInput from "./component/fileInput";
import Output from "./component/output";
import { DataProvider } from "./component/DataContext";

function App() {
  return (
    <>
      <DataProvider>
        <div className="page-holder bg-image">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-ml-6 mx-auto">
                  <div class="card">
                    <div class="card-body">
                      <FileInput />
                      <Output />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DataProvider>
    </>
  );
}

export default App;

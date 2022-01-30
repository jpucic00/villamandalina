import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SimpleReactLightbox>
        <App />
      </SimpleReactLightbox>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

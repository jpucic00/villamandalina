import React from "react";
import Layout from "./components/layout";
import { AuthProvider } from "./AuthContext";

import Router from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Layout>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          <Router />
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default App;

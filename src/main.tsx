// import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
// import createStore from "./store";
import store from "./store.ts";
// import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";

// const history = createBrowserHistory();
// const store = createStore(history);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <App />
//       </ConnectedRouter>
//     </Provider>
//   </React.StrictMode>
// );

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <div>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>
);

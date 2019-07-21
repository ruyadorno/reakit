import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import ConditionallyRenderedDialog from "./conditionally-rendered-dialog/App";
import AnimatedMenu from "./animated-menu/App";
import Kanban from "./kanban/App";

const paths = {
  "conditionally-rendered-dialog": ConditionallyRenderedDialog,
  "animated-menu": AnimatedMenu,
  kanban: Kanban
};

function App() {
  return (
    <div style={{ display: "flex" }}>
      <ul style={{ flex: 0, whiteSpace: "nowrap" }}>
        {Object.keys(paths).map(path => (
          <li key={path}>
            <Link to={path}>{path}</Link>
          </li>
        ))}
      </ul>
      <div style={{ margin: 16 }}>
        <Router>
          {Object.entries(paths).map(([path, Component]) => (
            <Component key={path} path={path} />
          ))}
        </Router>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

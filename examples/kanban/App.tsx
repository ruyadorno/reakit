import * as React from "react";
import { Provider, useRoverState } from "reakit";
import * as system from "reakit-system-bootstrap";
import Column from "./Column";

function App() {
  const rover = useRoverState({ orientation: "horizontal" });
  return (
    <Provider unstable_system={system}>
      <div style={{ display: "flex" }}>
        <Column {...rover} title="TODO" />
        <Column {...rover} title="DOING" />
        <Column {...rover} title="DONE" />
      </div>
    </Provider>
  );
}

export default App;

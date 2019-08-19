import * as React from "react";
import { Provider } from "reakit";
import * as system from "reakit-system-bootstrap";
import Board from "./components/Board";

function App() {
  return (
    <Provider unstable_system={system} unstable_prefix="kanban">
      <Board />
    </Provider>
  );
}

export default App;

import * as React from "react";
import { Provider } from "reakit";
import Board from "./components/Board";
import "./style.css";
import { useBoardContext } from "./hooks/useBoardState";

function App() {
  return (
    <Provider unstable_prefix="kanban">
      <useBoardContext.Provider>
        <Board />
      </useBoardContext.Provider>
    </Provider>
  );
}

export default App;

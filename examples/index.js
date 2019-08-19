import React from "react";
import ReactDOM from "react-dom";
import { Router, Link, Location } from "@reach/router";
import { Provider, useMenuState, Menu, MenuItem, MenuDisclosure } from "reakit";
import * as system from "reakit-system-bootstrap";
import AnimatedMenu from "./animated-menu/App";
import Kanban from "./kanban/App";

const paths = {
  "animated-menu": AnimatedMenu,
  kanban: Kanban
};

// TODO: Replace by Listbox in the future
function ExamplesMenu({ location }) {
  const menu = useMenuState({ unstable_boundariesElement: "viewport" });
  const pathKeys = Object.keys(paths);
  const currentPath = pathKeys.find(key => location.pathname.includes(key));

  React.useEffect(() => {
    if (menu.visible) {
      menu.move(`examples-menu-${currentPath}`);
    }
  }, [menu.visible, menu.move, currentPath]);

  return (
    <div style={{ position: "absolute", top: 8, right: 8 }}>
      <MenuDisclosure {...menu}>{currentPath}</MenuDisclosure>
      <Menu {...menu} aria-label="Examples">
        {pathKeys.map(path => (
          <MenuItem
            {...menu}
            key={path}
            as={Link}
            to={path}
            id={`examples-menu-${path}`}
          >
            {path}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Provider unstable_system={system}>
        <Location>
          {({ location }) => <ExamplesMenu location={location} />}
        </Location>
      </Provider>
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

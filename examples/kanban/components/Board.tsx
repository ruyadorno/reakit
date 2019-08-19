import * as React from "react";
import { useRoverState, useDialogState, DialogDisclosure } from "reakit";
import Column from "./Column";
import ColumnModal from "./ColumnModal";
import TabbableRover from "./TabbableRover";

let counter = 3;
const initialColumns = [
  { id: 1, title: "TODO" },
  { id: 2, title: "DOING" },
  { id: 3, title: "DONE" }
];

function Board() {
  const rover = useRoverState({ orientation: "horizontal" });
  const dialog = useDialogState();
  const [columns, setColumns] = React.useState(initialColumns);

  const addColumn = (title: string) => {
    setColumns(prevColumns => [...prevColumns, { id: ++counter, title }]);
  };

  const removeColumn = (id: number) => {
    setColumns(prevColumns => {
      const index = prevColumns.findIndex(card => card.id === id);
      return [...prevColumns.slice(0, index), ...prevColumns.slice(index + 1)];
    });
  };

  const editColumn = (id: number, title: string) => {
    setColumns(prevColumns => {
      const index = prevColumns.findIndex(card => card.id === id);
      return [
        ...prevColumns.slice(0, index),
        { id, title },
        ...prevColumns.slice(index + 1)
      ];
    });
  };

  return (
    <div style={{ display: "flex" }}>
      {columns.map(column => (
        <Column
          {...rover}
          key={column.id}
          title={column.title}
          onSubmit={content => editColumn(column.id, content)}
          onRemove={() => removeColumn(column.id)}
        />
      ))}
      <TabbableRover as={DialogDisclosure} {...rover} {...dialog}>
        Create column
      </TabbableRover>
      <ColumnModal {...dialog} title="" onSubmit={addColumn} />
    </div>
  );
}

export default Board;

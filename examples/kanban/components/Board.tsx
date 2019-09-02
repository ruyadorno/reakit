import * as React from "react";
import { useRoverState, useDialogState, DialogDisclosure } from "reakit";
import { useBoardContext } from "../hooks/useBoardState";
import Column from "./Column";
import ColumnModal from "./ColumnModal";
import TabbableRover from "./TabbableRover";

function Board() {
  const rover = useRoverState({ orientation: "horizontal" });
  const dialog = useDialogState();
  const { columns, addColumn, removeColumn, editColumn } = useBoardContext();

  return (
    <div style={{ display: "flex" }}>
      {columns.map(column => (
        <Column
          {...rover}
          columnId={column.id}
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

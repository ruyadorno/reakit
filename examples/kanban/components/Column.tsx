/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import { RoverProps, Rover, useRoverState, useToolbarState } from "reakit";
import { useBoardContext } from "../hooks/useBoardState";
import Card from "./Card";
import ColumnToolbar from "./ColumnToolbar";

type ColumnProps = Omit<RoverProps, "onSubmit"> & {
  columnId: number;
  title: string;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

function Column({
  columnId,
  title,
  onSubmit,
  onRemove,
  ...props
}: ColumnProps) {
  const rover = useRoverState({ orientation: "vertical" });
  const toolbar = useToolbarState();
  const { columns, addCard, removeCard, editCard } = useBoardContext();

  const { cards = [] } = columns.find(column => column.id === columnId) || {};

  return (
    <Rover
      {...props}
      className="column"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        margin: 20
      }}
    >
      {roverProps => (
        <div {...roverProps} tabIndex={0}>
          <h1>{title}</h1>

          <ColumnToolbar
            {...toolbar}
            title={title}
            addCard={content => addCard(columnId, content)}
            onSubmit={onSubmit}
            onRemove={onRemove}
          />

          {cards.map(card => (
            <Card
              {...rover}
              tabIndex={0}
              key={card.id}
              content={card.content}
              onRemove={() => removeCard(card.id)}
              onSubmit={content => editCard(card.id, content)}
            />
          ))}
        </div>
      )}
    </Rover>
  );
}

export default Column;

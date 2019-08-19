/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import { RoverProps, Rover, useRoverState, useToolbarState } from "reakit";
import Card from "./Card";
import ColumnToolbar from "./ColumnToolbar";

type ColumnProps = Omit<RoverProps, "onSubmit"> & {
  title: string;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

let counter = 3;

const initialCards = [
  { id: 1, content: "Test card 1" },
  { id: 2, content: "Test card 2" },
  { id: 3, content: "Test card 3" }
];

function Column({ title, onSubmit, onRemove, ...props }: ColumnProps) {
  const rover = useRoverState({ orientation: "vertical" });
  const toolbar = useToolbarState();
  const [cards, setCards] = React.useState(initialCards);

  const addCard = (content: string) => {
    setCards(prevCards => [...prevCards, { id: ++counter, content }]);
  };

  const removeCard = (id: number) => {
    setCards(prevCards => {
      const index = prevCards.findIndex(card => card.id === id);
      return [...prevCards.slice(0, index), ...prevCards.slice(index + 1)];
    });
  };

  const editCard = (id: number, content: string) => {
    setCards(prevCards => {
      const index = prevCards.findIndex(card => card.id === id);
      return [
        ...prevCards.slice(0, index),
        { id, content },
        ...prevCards.slice(index + 1)
      ];
    });
  };

  return (
    <Rover
      {...props}
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
            addCard={addCard}
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

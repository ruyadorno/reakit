/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import {
  RoverProps,
  Rover,
  useRoverState,
  DialogDisclosure,
  useDialogState
} from "reakit";
import Card from "./Card";
import CardModal from "./CardModal";

type ColumnProps = RoverProps & {
  title: string;
};

let counter = 0;

function Column({ title, ...props }: ColumnProps) {
  const rover = useRoverState({ orientation: "vertical" });
  const dialog = useDialogState();
  const [cards, setCards] = React.useState<
    Array<{ id: number; content: string }>
  >([]);

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
          <Rover as={DialogDisclosure} {...rover} {...dialog}>
            Create card
          </Rover>
          <CardModal
            {...dialog}
            content=""
            onSubmit={content => {
              addCard(content);
              dialog.hide();
            }}
          />
          {cards.map(card => (
            <Card
              {...rover}
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

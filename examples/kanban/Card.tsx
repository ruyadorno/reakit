/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import { RoverProps, Rover, DialogDisclosure, useDialogState } from "reakit";
import CardModal from "./CardModal";

type CardProps = RoverProps & {
  content: string;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

function Card({ content, onSubmit, onRemove, ...props }: CardProps) {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>
        {disclosureProps => (
          <Rover {...disclosureProps} {...props} as="div">
            {content}
          </Rover>
        )}
      </DialogDisclosure>
      <CardModal
        {...dialog}
        content={content}
        onRemove={
          onRemove &&
          (() => {
            onRemove();
            dialog.hide();
          })
        }
        onSubmit={content => {
          onSubmit(content);
          dialog.hide();
        }}
      />
    </>
  );
}

export default Card;

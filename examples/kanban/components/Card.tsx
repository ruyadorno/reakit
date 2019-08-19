/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import { RoverProps, DialogDisclosure, useDialogState } from "reakit";
import CardModal from "./CardModal";
import TabbableRover from "./TabbableRover";

type CardProps = Omit<RoverProps, "onSubmit"> & {
  content: string;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

function Card({ content, onSubmit, onRemove, ...props }: CardProps) {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>
        {htmlProps => (
          <TabbableRover {...htmlProps} {...props} as="div">
            {content}
          </TabbableRover>
        )}
      </DialogDisclosure>
      <CardModal
        {...dialog}
        content={content}
        onRemove={onRemove}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Card;

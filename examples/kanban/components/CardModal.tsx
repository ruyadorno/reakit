import * as React from "react";
import { DialogProps, Dialog, Button } from "reakit";
import CardForm from "./CardForm";

type CardModalProps = Omit<DialogProps, "onSubmit"> & {
  content: string;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

function CardModal({ content, onSubmit, onRemove, ...props }: CardModalProps) {
  return (
    <Dialog {...props} aria-label="Card contents">
      {dialogProps =>
        props.visible && (
          <div {...dialogProps}>
            <CardForm
              onSubmit={c => {
                onSubmit(c);
                props.hide && props.hide();
              }}
              content={content}
            />
            {onRemove && (
              <Button
                onClick={() => {
                  onRemove();
                  props.hide && props.hide();
                }}
              >
                Remove
              </Button>
            )}
          </div>
        )
      }
    </Dialog>
  );
}

export default CardModal;

import * as React from "react";
import { DialogProps, Dialog, Button } from "reakit";
import CardForm from "./CardForm";

type CardModalProps = DialogProps & {
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
            {content}
            {onRemove && <Button onClick={onRemove}>Remove</Button>}
            <CardForm onSubmit={onSubmit} content={content} />
          </div>
        )
      }
    </Dialog>
  );
}

export default CardModal;

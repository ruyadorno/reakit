import * as React from "react";
import { DialogProps, Dialog } from "reakit";
import ColumnForm from "./ColumnForm";

type ColumnModalProps = Omit<DialogProps, "onSubmit"> & {
  title: string;
  onSubmit: (title: string) => void;
};

function ColumnModal({ title, onSubmit, ...props }: ColumnModalProps) {
  return (
    <Dialog {...props} aria-label="Column">
      {dialogProps =>
        props.visible && (
          <div {...dialogProps}>
            <ColumnForm
              onSubmit={c => {
                onSubmit(c);
                props.hide && props.hide();
              }}
              title={title}
            />
          </div>
        )
      }
    </Dialog>
  );
}

export default ColumnModal;

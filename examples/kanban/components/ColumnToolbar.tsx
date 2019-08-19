/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from "react";
import {
  Toolbar,
  DialogDisclosure,
  useDialogState,
  ToolbarItem,
  useMenuState,
  Menu,
  MenuDisclosure,
  MenuItem,
  RoverProps
} from "reakit";
import CardModal from "./CardModal";
import ColumnModal from "./ColumnModal";

type ColumnToolbarProps = Omit<RoverProps, "onSubmit"> & {
  title: string;
  addCard: (content: string) => void;
  onSubmit: (content: string) => void;
  onRemove?: () => void;
};

function ColumnToolbar({
  title,
  addCard,
  onSubmit,
  onRemove,
  ...props
}: ColumnToolbarProps) {
  const columnDialog = useDialogState();
  const cardDialog = useDialogState();
  const menu = useMenuState({ placement: "bottom-end" });

  return (
    <Toolbar {...props} aria-label={`${title} options`}>
      <ToolbarItem as={DialogDisclosure} {...props} {...cardDialog}>
        Create card
      </ToolbarItem>
      <CardModal {...cardDialog} content="" onSubmit={addCard} />

      <ToolbarItem as={DialogDisclosure} {...props} {...columnDialog}>
        Edit
      </ToolbarItem>
      <ColumnModal {...columnDialog} title={title} onSubmit={onSubmit} />

      {onRemove && (
        <>
          <ToolbarItem {...props}>
            {htmlProps => (
              <MenuDisclosure {...menu} {...htmlProps}>
                More
              </MenuDisclosure>
            )}
          </ToolbarItem>
          <Menu {...menu} aria-label="More options">
            <MenuItem {...menu} onClick={onRemove}>
              Remove column
            </MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
}

export default ColumnToolbar;

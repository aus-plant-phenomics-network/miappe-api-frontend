import React from "react";
import { Tooltip, TooltipProps } from "./tooltip";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./button.css";

type ButtonProps = Omit<TooltipProps, "children"> &
  React.ComponentPropsWithoutRef<"button">;

const createButton = (buttonName: string, icon: React.JSX.Element) => {
  const ButtonComponent = React.memo(
    React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
      const { tooltipContent, ...rest } = props;
      const rendered = tooltipContent ? (
        <Tooltip tooltipContent={tooltipContent}>
          <button ref={ref} {...rest}>
            {icon}
          </button>
        </Tooltip>
      ) : (
        <button ref={ref} {...rest}>
          {icon}
        </button>
      );
      return rendered;
    }),
  );
  ButtonComponent.displayName = buttonName;
  return ButtonComponent;
};

// Edit Button
const EditButton = createButton(
  "EditButton",
  <Pencil1Icon className="Icons" />,
);

// Delete Button
const DeleteButton = createButton(
  "DeleteButton",
  <TrashIcon className="Icons" />,
);

// Add Button
const AddButton = createButton("AddButton", <PlusIcon className="Icons" />);

// Delete Alert Button
const DeleteAlertButton: React.FC<
  {
    tooltipContent: string;
    dialogTitle: string;
    dialogDescription: string;
    dialogCancelButtonName: string;
    dialogSubmitButtonName: string;
    dialogOnCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    dialogOnSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  } & React.ComponentPropsWithoutRef<"button">
> = ({
  tooltipContent,
  dialogTitle,
  dialogDescription,
  dialogCancelButtonName = "Cancel",
  dialogSubmitButtonName = "OK",
  dialogOnCancel,
  dialogOnSubmit,
  ...rest
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <DeleteButton tooltipContent={tooltipContent} />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            {dialogTitle}
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            {dialogDescription}
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve" onClick={dialogOnCancel}>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="Button red" onClick={dialogOnSubmit}>
                Yes, Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { EditButton, DeleteAlertButton, AddButton, DeleteButton };
export type { ButtonProps };

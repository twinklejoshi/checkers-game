import React from "react";
import "./ConfirmationDialog.scss";
import { Button } from "../Button/Button";

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <div className="buttons-group">
          <Button
            label="Confirm"
            className="confirm"
            onButtonClick={onConfirm}
          />
          <Button label="Cancel" className="cancel" onButtonClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

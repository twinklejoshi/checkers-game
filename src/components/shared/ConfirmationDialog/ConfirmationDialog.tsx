import React from "react";
import "./ConfirmationDialog.scss";
import { Button } from "../Button/Button";

interface ConfirmationDialogProps {
  message: string;
  label1: string;
  label2: string;
  onButtonClick1: () => void;
  onButtonClick2: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  label1,
  label2,
  onButtonClick1,
  onButtonClick2,
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <div className="buttons-group">
          <Button
            label={label1}
            className="confirm"
            onButtonClick={onButtonClick1}
          />
          <Button label={label2} className="cancel" onButtonClick={onButtonClick2} />
        </div>
      </div>
    </div>
  );
};

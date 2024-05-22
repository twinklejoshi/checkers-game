import { useState } from "react";
import "./InputForm.scss";
import { Button, ButtonTypes } from "../Button/Button";

interface InputFormProps {
  id: string;
  label: string;
  inputValue: string;
  onChange: (value: string) => void;
  onSubmitPlayer: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  id,
  label,
  inputValue,
  onChange,
  onSubmitPlayer,
}: InputFormProps) => {
  const inputField = id.charAt(0).toUpperCase() + id.slice(1);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputValue = (value: string) => {
    if (value.trim().length === 0) {
      setIsValid(false);
      setErrorMessage(`${inputField} is required.`);
    } else if (value.length < 3) {
      setIsValid(false);
      setErrorMessage(`${inputField} must be at least 3 characters long.`);
    } else if (value.length > 10) {
      setIsValid(false);
      setErrorMessage(`${inputField} must be less than 15 characters.`);
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    validateInputValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && inputValue.trim() !== "") {
      onSubmitPlayer();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          minLength={3}
          maxLength={11}
          value={inputValue}
          onChange={handleChange}
          className={`input ${isValid ? "" : "invalid"}`}
        />
        {!isValid && <div className="error">{errorMessage}</div>}
      </div>
      <Button
        label="Play now"
        type={ButtonTypes.Submit}
        disabled={!isValid || inputValue.trim() === ""}
      />
    </form>
  );
};

import { FC } from "react";
import { TextboxProps } from "../../constants";
export const Textbox: FC<TextboxProps> = ({
  value,
  onChange,
  placeholder,
  onEnter,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onEnter}
    />
  );
};

export default Textbox;

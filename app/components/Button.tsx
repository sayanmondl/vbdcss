import { ArrowRight } from "lucide-react";
import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="button-default flex text-nowrap items-center gap-4">
      {text}
      <ArrowRight size={20} />
    </button>
  );
};

export const ButtonWhite = ({ text }: { text: string }) => {
  return (
    <button className="button-white flex items-center text-nowrap gap-4">
      {text}
      <ArrowRight size={20} />
    </button>
  );
};

export const SmallButton = ({ text }: { text: string }) => {
  return <button className="small-button flex items-center">{text}</button>;
};

export default Button;

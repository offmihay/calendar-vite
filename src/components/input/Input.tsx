import { FC, JSX } from "react";

type Props = {
  label?: string;
} & JSX.IntrinsicElements["input"];

const Input: FC<Props> = ({ label, ...props }) => {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;

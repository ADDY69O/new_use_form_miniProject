import React from "react";

const Input = ({ type, placeholder, className, error, ...props }) => {
  // {
  //   type,
  //     placeholder,
  //     className,
  //     // register,
  //     name,
  //     // rules,
  //     // defaultInput,
  //     error;
  // } = props;
  //   console.log(props);
  //   for (let ele in props) {
  //     console.log(ele);
  //   }
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        // {...register,{defaultInput,...rules}}
        {...props}
      />

      {error && error.length > 0 && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default Input;

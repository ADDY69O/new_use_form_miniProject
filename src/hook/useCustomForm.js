import React, { useState } from "react";

const useCustomForm = (initialInput, validate) => {
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const validationErrors = validate(input);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const register = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validateInput()) {
      callback(input);
    }
  };

  return {
    input,
    register,
    handleSubmit,
    errors,
  };
};

export default useCustomForm;

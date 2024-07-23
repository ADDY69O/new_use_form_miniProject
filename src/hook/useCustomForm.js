import React, { useState } from "react";

const useCustomForm = (initialInput) => {
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});

  const validateField = (name, value, rules) => {
    let error = "";
    if (rules?.required && !value) {
      error = rules.required;
    } else if (rules?.minLength && value.length < rules.minLength.value) {
      error = rules.minLength.message;
    } else if (rules?.pattern && !rules.pattern.value.test(value)) {
      error = rules.pattern.message;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const validateInput = () => {
    const validationErrors = {};
    Object.keys(input).forEach((name) => {
      const { value, rules } = input[name];
      const error = validateField(name, value, rules);
      if (error) {
        validationErrors[name] = error;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const register = (name, rules) => {
    return {
      name,
      value: input[name]?.value || "",
      onChange: (e) => {
        const value = e.target.value;
        setInput((prevInput) => ({
          ...prevInput,
          [name]: { value, rules },
        }));
        validateField(name, value, rules);
      },
      onFocus: (e) => {
        const value = e.target.value;
        validateField(name, value, rules);
      },
      onBlur: (e) => {
        const value = e.target.value;
        validateField(name, value, rules);
      },
    };
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validateInput()) {
      console.log(input);
      const formData = {};
      Object.keys(input).forEach((name) => {
        formData[name] = input[name].value;
      });
      callback(formData);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
  };
};

export default useCustomForm;

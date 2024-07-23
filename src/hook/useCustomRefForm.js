import { useRef, useState } from "react";

const useCustomRefForm = (initialInput) => {
  const inputRefs = useRef(initialInput);
  const [errors, setErrors] = useState({});

  const ValidationByDefault = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    },
  };

  const validateField = (name, value, rules) => {
    console.log(inputRefs.current);
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
    Object.keys(inputRefs.current).forEach((name) => {
      const { value, rules } = inputRefs.current[name];
      const error = validateField(name, value, rules);
      if (error) {
        validationErrors[name] = error;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const register = (name, rules) => {
    const validationRule =
      rules?.defaultValidation && ValidationByDefault[rules.defaultValidation]
        ? ValidationByDefault[rules.defaultValidation]
        : rules;

    console.log(name, rules);

    return {
      name,
      ref: (el) => {
        if (el) {
          inputRefs.current[name] = { value: el.value, rules: validationRule };
        }
      },
      value: inputRefs.current[name]?.value || "",
      onChange: (e) => {
        const value = e.target.value;
        inputRefs.current[name].value = value;
        console.log(inputRefs.current);
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
      console.log(inputRefs.current);
      const formData = {};
      Object.keys(inputRefs.current).forEach((name) => {
        formData[name] = inputRefs.current[name].value;
      });
      callback(formData);
    }
  };

  return {
    input: inputRefs.current,
    register,
    handleSubmit,
    errors,
  };
};

export default useCustomRefForm;

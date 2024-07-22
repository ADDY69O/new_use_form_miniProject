import { useRef, useState } from "react";

const useCustomRefForm = (initialInput, validate) => {
  const inputRefs = useRef(initialInput);
  const errorRefs = useRef({});
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const validationErrors = validate(inputRefs.current);
    errorRefs.current = validationErrors;
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const register = (name) => {
    return {
      name,
      ref: (el) => {
        if (el) {
          inputRefs.current[name] = el.value;
        }
      },
      onChange: (e) => {
        inputRefs.current[name] = e.target.value;
      },
    };
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validateInput()) {
      callback(inputRefs.current);
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

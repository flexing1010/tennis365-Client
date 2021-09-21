import { useState } from "react";

const useInputChanges = (initValues) => {
  const [values, setValues] = useState(initValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  return { values, handleInputChange, setValues };
};

export default useInputChanges;

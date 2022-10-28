import React from "react";
import { Field, ErrorMessage } from "formik";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>
      <Field
        className={"form-control shadow-none"}
        as="select"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default Select;

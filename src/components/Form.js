import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import Select from "./Select";
import axios from "axios";
export const Form = () => {

  const dropdown = [
    { key: "select an option", value: "" },
    { key: "Veg", value: "veg" },
    { key: "Non-Veg", value: "nonveg" },
  ];
  const dropdown2 = [
    { key: "select an option", value: "" },
    { key: "WorkFromHome", value: "wfh" },
    { key: "WorkFromOffice", value: "wfo" },
    { key: "Hybrid", value: "hybrid" },
  ];

  const validate = Yup.object({
    TechSkills: Yup.string().required("Required"),
    WorkedSkills: Yup.string().required("Required"),
  });
  return (
    <Formik
      initialValues={{
        TechSkills: "",
        WorkedSkills: "",
        Experience: 0,
        Role: "",
        shirtsize: 0,
        sports: "",
        talents: "",
        foodtype: "",
        worklocation: ""
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        let s1 = values.TechSkills.split(",").map((item) => {
          item = item.trim();
          return item.toLocaleLowerCase();
        });
        let s2 = values.WorkedSkills.split(",").map((item) => {
          item = item.trim();
          return item.toLocaleLowerCase();
        });
        let s3 = values.sports.split(",").map((item) => {
          item = item.trim();
          return item.toLocaleLowerCase();
        });
        let s4 = values.talents.split(",").map((item) => {
          item = item.trim();
          return item.toLocaleLowerCase();
        });
        values = { ...values, TechSkills: s1, WorkedSkills: s2,sports: s3, talents: s4 };
         console.log(values);
        axios.post("http://localhost:5000/userdata", values)
        .then((data)=>{
          console.log(data.data)
        })
        .catch((err)=>{
          console.log("error")
        })
      }}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Enter User Information</h1>
          <Form>
            <TextField label="Enter Skills" name="TechSkills" type="text" />
            <TextField
              label="Enter Worked Skills"
              name="WorkedSkills"
              type="text"
            />
            <TextField
              label="Enter Experience"
              name="Experience"
              type="number"
            />
            <TextField label="Enter Role" name="Role" type="text" />
            <TextField label="Enter ShirtSize" name="shirtsize" type="text" />
            <TextField label="Enter Sports" name="sports" type="text" />
            <TextField label="Enter Talents" name="talents" type="text" />
            <Select
              label="select Preferred Food"
              name="foodtype"
              options={dropdown}
            />
            <Select
              label="Work Location"
              name="worklocation"
              options={dropdown2}
            />
            <button className="btn btn-dark mt-3" type="submit">
              Register
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Reset
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

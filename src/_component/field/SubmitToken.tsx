import { useFormikContext } from "formik";
import React from "react";

export default function SubmitToken() {
  const { dirty, isValid, submitForm, values } = useFormikContext();
  React.useEffect(() => {
    if (isValid && dirty) {
      submitForm();
    }
  }, [dirty, isValid, submitForm, values]);
  return null;
}
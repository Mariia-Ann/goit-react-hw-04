import { ErrorMessage, Field, Form, Formik } from "formik";
import style from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useId } from "react";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <div className={style.label}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={style.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage name="name" component="span" className={style.error} />
        </div>
        <div className={style.label}>
          <label htmlFor={numberId}>Number</label>
          <Field
            className={style.field}
            type="text"
            name="number"
            id={numberId}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={style.error}
          />
        </div>

        <button className={style.btnForm} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

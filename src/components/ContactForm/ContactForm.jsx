import css from './ContactForm.module.css';
import clsx from 'clsx';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { ContactSchema, contactFormInitValues } from '../../constants';

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(addContact(values));
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={contactFormInitValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {formikValid => {
        return (
          <Form className={css.form}>
            <div>
              <label className={css.formLabel} htmlFor={nameFieldId}>
                Name
              </label>
              <Field
                className={clsx(css.formField, {
                  [css.formFieldWarning]:
                    formikValid.touched.name && formikValid.errors.name,
                })}
                type="text"
                name="name"
                id={nameFieldId}
              />
              <ErrorMessage
                className={css.warning}
                name="name"
                component="span"
              />
            </div>

            <div>
              <label className={css.formLabel} htmlFor={numberFieldId}>
                Number
              </label>
              <Field
                className={clsx(css.formField, {
                  [css.formFieldWarning]:
                    formikValid.touched.number && formikValid.errors.number,
                })}
                type="tel"
                name="number"
                id={numberFieldId}
              />
              <ErrorMessage
                className={css.warning}
                name="number"
                component="span"
              />
            </div>

            <button className={css.formBtn} type="submit">
              Add contact
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
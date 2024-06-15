import css from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { addContact } from "../../redux/contactsOps";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  number: Yup.string()
    .matches(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
      'Invalid phone number'
    )
    .min(3, 'Must be at least 3 characters long')
    .max(50, 'Must be no more than 50 characters long')
    .required('Required'),
});

const formInitialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
    const dispatch = useDispatch();

    function handleSubmit(values, actions) {
        dispatch(
            addContact({
            name: values.name,
            number: values.number,
            })
        );
        actions.resetForm();
    }
    
    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={contactFormSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.contactForm}>
                <label>
                    Name
                    <Field type="text" name="name" />
                    <ErrorMessage className={css.warning} component="p" name="name" />
                </label>
                <label>
                    Number
                    <Field type="tel" name="number" />
                    <ErrorMessage className={css.warning} component="p" name="number" />
                </label>
                <button type="submit">
                    Add contact
                </button>
            </Form>
        </Formik>

    );
};

export default ContactForm;
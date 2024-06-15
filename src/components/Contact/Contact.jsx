import { HiUser, HiPhone } from 'react-icons/hi';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ contact }) => {
    const dispatch = useDispatch();

    return (
    <li className={css.contactListItem}>
        <div className={css.contactWrapper}>
            <div>
                <p className={css.contactInfo}>
                    <HiUser size={20} /> {contact.name}
                </p>
                <p className={css.contactInfo}>
                    <HiPhone size={20} /> {contact.number}
                </p>
            </div>

            <button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
                Delete
            </button>
        </div>
    </li>
  );
};

export default Contact;
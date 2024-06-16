import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

const ContactList = () => {

    const filteredContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.contactList}>
            {filteredContacts.map(contact => (
                <Contact contact={contact} key={contact.id} />
            ))}
        </ul>
    );
};

export default ContactList;
import './App.css'
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectLoading, selectError } from '../../redux/contactsSlice';
import { fetchContacts } from '../../redux/contactsOps';
import Loader from '../Loader/Loader';

function App() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && { error }}
      {loading && <Loader />}
      {contacts.length > 0 ? (
        <ContactList />
      ) : (
        <p>Your phonebook is currently empty.</p>
      )}
    </div>
  )
}

export default App

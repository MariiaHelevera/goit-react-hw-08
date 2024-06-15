import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://66671269a2f8516ff7a6304a.mockapi.io/';

const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('/contacts');
      return response.data;
    } catch {
      return rejectWithValue('Unable to upload data.');
      }
});

const addContact = createAsyncThunk('contacts/addContact', async (newContact, { rejectWithValue }) => {
    try {
        const response = await axios.post('/contacts', newContact);
        return response.data;
    } catch {
        return rejectWithValue('Failed to add a contact')
    }
});

const deleteContact = createAsyncThunk('/contacts/deleteContact', async (contactId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
    } catch {
        return rejectWithValue('Failed to delete a contact');
    }
});

export { fetchContacts, addContact, deleteContact };
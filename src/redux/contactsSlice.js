import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectFilters } from './filtersSlice';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            // fetchContacts
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            // addContact
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, handleRejected)
            // deleteContact
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    contact => contact.id !== action.payload.id
                );
                state.loading = false;
            })
            .addCase(deleteContact.rejected, handleRejected);
    }
});

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector([selectContacts, selectFilters], (contacts, filter) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
});

export default contactsSlice.reducer;
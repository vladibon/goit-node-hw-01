const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch ({ message }) {
    console.log(message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId) || null;
  } catch ({ message }) {
    console.log(message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx === -1) return null;

    const removedContact = contacts.splice(idx, 1)[0];
    await updateContacts(contacts);
    return removedContact;
  } catch ({ message }) {
    console.log(message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: nanoid(8), name, email, phone };
    const contacts = await listContacts();

    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch ({ message }) {
    console.log(message);
  }
};

const updateContacts = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

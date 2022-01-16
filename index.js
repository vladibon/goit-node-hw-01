const { Command } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
invokeAction(program.opts());

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);

      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }

      console.log(contact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

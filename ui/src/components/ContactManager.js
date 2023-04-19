import Component from "@xavisoft/react-component";
import swal from 'sweetalert';
import request from '../request';
import { hideLoading, showLoading } from '../loading';
import Button from '@mui/material/Button';
import Contact from "./Contact";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddContact from "./AddContact";
import { requestConfirmation } from "../utils";

export default class ContactManager extends Component {

   state = {
      contacts: [],
      contactsFetched: false,
      contactEditorOpen: false
   }

   openContactEditor = () => {
      return this.updateState({ contactEditorOpen: true })
   }

   closeContactEditor = (contact) => {

      const update = { contactEditorOpen: false };

      if (contact)
         update.contacts = [ ...this.state.contacts, contact ];

      return this.updateState(update);

   }

   fetchContacts = async () => {
      try {
         showLoading();

         const res = await request.get('/api/contacts');
         const contacts = res.data;

         this.updateState({ contacts, contactsFetched: true });

      } catch (err) {
         swal(String(err));
      } finally {
         hideLoading();
      }
   }

   deleteContact = async (id) => {

      const [ contact ] = this.state.contacts.filter(item => item.id === id);

      const question = `Delete contact "${contact.name}"?`;
      const confirmation = await requestConfirmation({ question });

      if (!confirmation)
         return;

      try {
         showLoading();

         await request.delete(`/api/contacts/${id}`);

         const contacts = this.state.contacts.filter(item => item.id !== id); 
         this.updateState({ contacts });
      } catch (err) {
         swal(String(err));
      } finally {
         hideLoading();
      }
   }

   componentDidMount() {
      this.fetchContacts();
   }

   render() {

      if (this.state.contactsFetched) {

         let contactsJSX;

         if (this.state.contacts.length > 0) {
            contactsJSX = this.state.contacts.map(contact => {
               return <Contact 
                  {...contact}
                  delete={this.deleteContact}
               />
               
            }) ;
         } else {
            contactsJSX = <p  className="text-lg text-gray-700">
               No contacts added yet
            </p>
         }

         return <div className="m-2">
            <h4>
               CONTACTS
               <IconButton onClick={this.openContactEditor}>
                  <AddIcon />
               </IconButton>
            </h4>

            {contactsJSX}

            <AddContact
               open={this.state.contactEditorOpen}
               close={this.closeContactEditor}
            />

         </div>

      } else {
         return <div className="fill-container vh-align">
            <div>
               <p className="text-lg text-gray-700">
                  Something went wrong
               </p>

               <Button onClick={this.fetchContacts}>
                  RETRY
               </Button>
            </div>
         </div>
      }

   }
}
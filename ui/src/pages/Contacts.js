
import swal from 'sweetalert';
import request from '../request';
import { hideLoading, showLoading } from '../loading';
import Button from '@mui/material/Button';
import Contact from "../components/Contact";
import Page from "./Page";


export default class Contacts extends Page {

   state = {
      contacts: [],
      contactsFetched: false,
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

   componentDidMount() {
      this.fetchContacts();
   }

   _render() {

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
            </h4>

            {contactsJSX}

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
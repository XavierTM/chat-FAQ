import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Component from "@xavisoft/react-component";
import { errorToast } from "../toast";
import { hideLoading, showLoading } from "../loading";
import swal from "sweetalert";
import request from "../request";


export default class AddContact extends Component {

   close = (data, isCancel=true) => {

      if (isCancel)
         return this.props.close();

      this.props.close(data);
   }


   submit = async () => {
      
      const txtName = document.getElementById('txt-name');
      const txtEmail = document.getElementById('txt-email');
      const txtPhone = document.getElementById('txt-phone');
      const txtBio = document.getElementById('txt-bio');

      const name = txtName.value;
      const email = txtEmail.value;
      const phone = txtPhone.value;
      const bio = txtBio.value;

      if (!name) {
         errorToast('Name is required');
         return txtName.focus();
      }

      if (!email) {
         errorToast('Email is required');
         return txtEmail.focus();
      }

      if (!phone) {
         errorToast('Phone number is required');
         return txtPhone.focus();
      }

      if (!bio) {
         errorToast('Bio is required');
         return txtBio.focus();
      }

      const data = { name, email, phone, bio };

      try {
         
         showLoading();

         const res = await request.post('/api/contacts', data);
         data.id = res.data.id;

         this.close(data, false);

      } catch (err) {
         swal(String(err))
      } finally {
         hideLoading();
      }

   }

   render() {

      return <Dialog open={this.props.open}>
         <DialogTitle>Media</DialogTitle>

         <DialogContent>

            <div className="[&>*]:my-2">
               <TextField
                  id="txt-name"
                  label="Name"
                  variant="standard"
                  size="small"
                  fullWidth
               />

               <TextField
                  id="txt-email"
                  label="Email"
                  variant="standard"
                  size="small"
                  fullWidth
               />

               <TextField
                  id="txt-phone"
                  label="Phone"
                  variant="standard"
                  size="small"
                  fullWidth
                  type="number"
               />

               <TextField
                  id="txt-bio"
                  label="Bio"
                  variant="standard"
                  size="small"
                  fullWidth
                  multiline
               />
            </div>
            
         </DialogContent>

         <DialogActions>

            <Button onClick={this.submit} variant="contained">
               SUBMIT
            </Button>

            <Button onClick={this.close}>
               CANCEL
            </Button>
         </DialogActions>
      </Dialog>
   }
}
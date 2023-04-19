import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Component from "@xavisoft/react-component";
import Base64FileInput from "./Base64FileInput";
import { errorToast } from "../toast";
import { hideLoading, showLoading } from "../loading";
import swal from "sweetalert";
import request from "../request";


export default class AddMedia extends Component {

   close = (data, isCancel=true) => {

      if (isCancel)
         return this.props.close();

      this.props.close(data);
   }


   submit = async () => {
      
      const txtMedia = document.getElementById('txt-media');

      if (!txtMedia.value) {
         errorToast('Select a file');
         return txtMedia.focus();
      }

      const { data, ext } = txtMedia.value;

      try {
         showLoading();

         const branch = this.props.branch.id;
         const res = await request.post('/api/media', { data, ext, branch });
         const id = res.data.id;

         this.close({
            id,
            ext,
         }, false);

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

            <p>
               Add media to <b>{(this.props.branch || {}).title}</b>
            </p>

            <Base64FileInput
               id="txt-media"
               accept="image/*"
            />
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
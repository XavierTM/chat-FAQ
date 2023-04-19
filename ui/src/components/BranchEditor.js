import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Component from "@xavisoft/react-component";
import { errorToast } from "../toast";
import { hideLoading, showLoading } from "../loading";
import swal from "sweetalert";
import request from "../request";


class BranchEditor extends Component {

   close = (data, isCancel=true) => {

      if (isCancel)
         return this.props.close();

      this.props.close(data);
   }

   submit = async () => {

      const txtTitle = document.getElementById('txt-title');
      const txtBody = document.getElementById('txt-body');

      const title = txtTitle.value;
      const body = txtBody.value;

      if (!title) {
         errorToast('Provide the title of your branch');
         return txtTitle.focus();
      }

      if (!body) {
         errorToast('Describe your branch');
         return txtBody.focus();
      }

      try {

         showLoading();

         const data = { title, body };

         if (this.props.parentBranch) {
            data.parent = this.props.parentBranch.id;
         } else {
            data.parent = null;
         }

         const res = await request.post('/api/branches', data);
         
         data.id = res.data.id;
         this.close(data, false);

      } catch (err) {
         swal(String(err));
      } finally {
         hideLoading();
      }
   }



   render() {

      let parentJSX;

      if (this.props.parentBranch) {
         parentJSX = <p classTitle="text-lg text-gray-500">
            Add branch under <b>{this.props.parentBranch.title}</b>
         </p>
      }

    
      return <Dialog open={this.props.open}>

         <DialogTitle>
            Add branch
         </DialogTitle>

         <DialogContent>
            <div classTitle="[&>*]:my-2">
               
               {parentJSX}

               <TextField
                  id="txt-title"
                  variant="standard"
                  size="small"
                  label="Title"
                  fullWidth
               />

               <TextField
                  id="txt-body"
                  variant="standard"
                  size="small"
                  label="Description"
                  fullWidth
                  multiline
               />
            </div>
         </DialogContent>

         <DialogActions>

            <Button onClick={this.submit} variant="contained">
               SAVE
            </Button>

            <Button onClick={this.close}>
               CANCEL
            </Button>
         </DialogActions>
      </Dialog>
   }
}

export default BranchEditor;
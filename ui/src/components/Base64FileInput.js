import { TextField } from "@mui/material";
import Component from "@xavisoft/react-component";
import { v4 as uuid } from 'uuid';



class Base64FileInput extends Component {

   id = 'file-' + uuid();

   getElem = () => {
      return document.getElementById(this.props.id || this.id);
   }

   onChange = ({ target }) => {
      
      const file = target.files[0];
      const elem = this.getElem();

      if (!file) {
         elem.value = null;
         return;
      }

      const reader = new window.FileReader();

      reader.onload = () => {
         const url = reader.result
         const data = url.replace(/^data:.+;base64,/, '');

         const ext = file.type.split('/')[1];

         elem.value = {
            data,
            name: file.name,
            type: file.type,
            ext,
         }
         
      }

      reader.readAsDataURL(file);

   }

   render() {

      return <div
         id={this.props.id || this.id}
      >
         <TextField
            size="small"
            variant="standard"
            label={this.props.label}
            onChange={this.onChange}
            type="file"
            inputProps={{
               accept: this.props.accept
            }}
            fullWidth={this.props.fullWidth}
         />
      </div>
   }
}


export default Base64FileInput;
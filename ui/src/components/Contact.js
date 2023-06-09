import { Divider, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function Contact(props) {

   let actionsJSX

   if (props.adminMode) {
      actionsJSX = <div 
         style={{ 
            position: 'absolute',
            bottom: 10,
            right: 10,
         }}
      >
         <IconButton onClick={() => props.delete(props.id)}>
            <DeleteIcon color="error" />
         </IconButton>
      </div>
   }

   return <div style={{ position: 'relative'}}>
      <div className="text-2xl font-bold">{props.name}</div>
      <div className="text-xl text-gray-500 font-bold">{props.email}</div>
      <div className="text-xl text-gray-700">{props.phone}</div>

      <p
         style={{
            paddingRight: 40,
         }}
      >{props.bio}</p>

      <Divider className="mb-5" />

      {actionsJSX}
   </div>
}
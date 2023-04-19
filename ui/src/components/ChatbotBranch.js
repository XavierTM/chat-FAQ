import {  Divider, IconButton } from "@mui/material";
import Component from "@xavisoft/react-component";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { formatLinks, formatNewLines, requestConfirmation } from "../utils";
import { hideLoading, showLoading } from "../loading";
import swal from "sweetalert";
import request from "../request";
import MediaThumbnail from "./MediaThumbnail";




export default class ChatbotBranch extends Component {

   state = {
      expanded: false,
   }

   toggleExpansion = () => {
      const expanded = !this.state.expanded;
      return this.updateState({ expanded })
   }

   
   addBranch = () => {
      const { id, title } = this.props;
      const parentToNewBranch = { id, title };
      this.props.add(parentToNewBranch);
   }

   addMedia = () => {
      const { id, title } = this.props;
      const branch = { id, title };
      this.props.addMedia(branch);
   }

   deleteBranch = async () => {

      // get confirmation
      const question = `Do you really want to delete the branch "${this.props.title}"`;
      const confirmButtonCaption = 'Yes, delete';
      const cancelButtonCaption = 'Cancel';

      const confirmation = await requestConfirmation({ question, confirmButtonCaption, cancelButtonCaption });
      if (!confirmation)
         return;

      // delete
      try {

         showLoading();

         const id = this.props.id;
         await request.delete(`/api/branches/${id}`);

         this.props.delete(id)

      } catch (err) {
         swal(String(err));
      } finally {
         hideLoading();
      }
   }


   render() {

      let expandedJSX, ToggleExpansionIcon;

      if (this.state.expanded) {

         ToggleExpansionIcon = KeyboardArrowDownIcon;

         let subOptionsJSX;

         if (this.props.branches && this.props.branches.length > 0) {
            subOptionsJSX = <>

               <Divider className="my-4" />

               <h6 className="text-gray-600 font-bold text-sm mt-1 mb-3">Sub-options</h6>

               {
                  this.props.branches.map(item => {
                     return <ChatbotBranch 
                        {...item} 
                        key={item.id}
                        delete={this.props.delete}
                        add={this.props.add}
                        addMedia={this.props.addMedia}
                        deleteMedia={this.props.deleteMedia}
                     />
                  })
               }
            </>
         }

         let mediaJSX;

         if (this.props.media && this.props.media.length > 0) {
            mediaJSX = <>

               <Divider className="my-4" />

               <h6 className="text-gray-600 font-bold text-sm mt-1 mb-3">Media</h6>

               {
                  this.props.media.map(item => {

                     console.log(this.props.media);

                     return <MediaThumbnail 
                        {...item} 
                        key={item.id}
                        branchId={this.props.id}
                        delete={this.props.deleteMedia}
                        adminMode
                     />
                  })
               }
            </>
         }

         expandedJSX = <>
            
            <div className="text-lg text-gray-500 px-4 my-3" style={{ borderLeft: '5px solid grey', }}>
               {formatLinks(formatNewLines(this.props.body))}
            </div>

            {subOptionsJSX}
            {mediaJSX}
         </>
      } else {
         ToggleExpansionIcon = KeyboardArrowRightIcon;
      }

      return <div
         style={{
            display: 'grid',
            gridTemplateColumns: '40px auto',
         }}
      >
         <div>
            <IconButton onClick={this.toggleExpansion} className="mt-1 text-3xl">
               <ToggleExpansionIcon />
            </IconButton>
         </div>

         <div>
            <div className="text-grey-900 text-xl pt-2">
               {this.props.title}

               <IconButton className="ml-5" size="small" onClick={this.addBranch}>
                  <AddIcon />
               </IconButton>

               <IconButton size="small" onClick={this.addMedia}>
                  <AttachFileIcon />
               </IconButton>

               <IconButton size="small" onClick={this.deleteBranch}>
                  <DeleteIcon />
               </IconButton>
            </div>
            {expandedJSX}
         </div>
      </div>
   }
}
import {  Button, IconButton } from "@mui/material";
import Component from "@xavisoft/react-component";
import AddIcon from '@mui/icons-material/Add';
import ChatbotBranch from './ChatbotBranch';
import BranchEditor from "./BranchEditor";
import { flattenBranches } from "../utils";
import swal from "sweetalert";
import { hideLoading, showLoading } from "../loading";
import request from "../request";
import AddMedia from "./AddMedia";


/// helper functions
function addMediaToTree(branches, branchId, media) {

   branches = [ ...branches ];
      
   const flattenedBranches = flattenBranches(branches);

   for (let i in flattenedBranches) {
      
      const potentialTarget = flattenedBranches[i];

      if (potentialTarget.id === branchId) {
         if (!potentialTarget.media)
            potentialTarget.media = [];

         potentialTarget.media = [ ...potentialTarget.media, media ];
         break;
      }
   }

   return branches;
}

function addBranchToTree(branches, branch) {

   branches = [ ...branches ];

   if (!branch.parent) {
      branches.push(branch);
   } else {
      
      const flattenedBranches = flattenBranches(branches);

      for (let i in flattenedBranches) {
         
         const potentialParent = flattenedBranches[i];

         if (potentialParent.id === branch.parent) {
            if (!potentialParent.branches)
               potentialParent.branches = [];

            potentialParent.branches = [ ...potentialParent.branches, branch ];
            break;
         }
      }
   }

   return branches;
}

function removeBranchFromTree(_branches, id) {

   // eslint-disable-next-line
   const[ done, branches ]= deleteBranchById(_branches, id);
   return branches;

}

function removeMediaFromTree(branches, branchId, id) {

   branches = [ ...branches ];
      
   const flattenedBranches = flattenBranches(branches);

   for (let i in flattenedBranches) {
      
      const potentialTarget = flattenedBranches[i];

      if (potentialTarget.id === branchId) {
         if (!potentialTarget.media)
            break;

         potentialTarget.media = potentialTarget.media.filter(item => item.id !== id);
         break;
      }
   }

   return branches;

}

function deleteBranchById(branches=[], id) {

   const resultingBranches = branches.filter(branch => branch.id !== id);

   if (resultingBranches.length !== branches.length)
      return [ true, resultingBranches ];

   let filtered = false;

   for (let i in resultingBranches) {
      const branch = resultingBranches[i];
      const [ done, resultingSubBranches] = deleteBranchById(branch.branches, id);

      if (done) {
         branch.branches = resultingSubBranches;
         filtered = true;
         break;
      }
   }

   return [ filtered, resultingBranches];
}

function createChatTree(branches) {

   // map
   const branchMap = new Map();

   branches.forEach(branch => {
      branchMap.set(branch.id, branch);
      branch.branches = [];
   });

   // build tree
   const topLevelBranches = branches.filter(item => item.parent === null);
   const nonTopLevelBranches = branches.filter(item => item.parent !== null);

   branches = topLevelBranches;

   nonTopLevelBranches.forEach(branch => {
      const parent = branchMap.get(branch.parent);

      if (parent) {
         parent.branches.push(branch);
      }
   });

   return branches;
}


class ConfigureChat extends Component {


   state = {
      branchEditorOpen: false,
      branches: [],
      dataFetched: false,
      newBranchParent: null,
      mediaEditorOpen: false,
      mediaBranch: null,
   }

   openMediaEditor = (mediaBranch) => {
      return this.updateState({ mediaEditorOpen: true, mediaBranch })
   }

   closeMediaEditor = (media) => {

      const update = { mediaEditorOpen: false, mediaBranch: null };

      if (media) {
         const branchId = this.state.mediaBranch.id;
         update.branches = addMediaToTree(this.state.branches, branchId, media)
      }

      return this.updateState(update);
      
   }

   deleteMedia = (branchId, mediaId) => {
      const branches = removeMediaFromTree(this.state.branches, branchId, mediaId);
      return this.updateState({ branches });
   }

   openBranchEditor = (newBranchParent) => {
      
      if (newBranchParent && newBranchParent.type === 'click')
         newBranchParent = null;

      return this.updateState({ branchEditorOpen: true, newBranchParent })
   }

   closeBranchEditor = (newBranch) => {

      const update = { branchEditorOpen: false, newBranchParent: null }

      if (newBranch)
         update.branches = addBranchToTree(this.state.branches, newBranch);

      return this.updateState(update);
   }

   deleteBranch = (id) => {
      const branches = removeBranchFromTree(this.state.branches, id);
      return this.updateState({ branches });
   }

   fetchdata = async () => {

      try {

         showLoading();

         const res = await request.get('/api/branches');

         const branches = createChatTree(res.data);

         this.updateState({
            dataFetched: true,
            branches,
         });

      } catch (err) {
         swal(String(err))
      } finally {
         hideLoading();
      }
   }

   componentDidMount() {
      this.fetchdata();
   }

   render() {

      const { branches, dataFetched } = this.state;

      if (!dataFetched) {
         return <div className="fill-container vh-align">
            <div>
               <p className="text-xl text-gray-600">
                  Something went wrong
               </p>

               <Button onClick={this.fetchdata}>
                  RETRY
               </Button>
            </div>
         </div>
      }


      let branchesJSX;

      if (branches.length > 0) {
         branchesJSX = branches.map(branch => {
         return <ChatbotBranch 
            {...branch} 
            delete={this.deleteBranch}
            add={this.openBranchEditor}
            addMedia={this.openMediaEditor}
            deleteMedia={this.deleteMedia}
            key={branch.id}
         />
      })
      } else {
         branchesJSX = <p className="text-gray-400 text-xl">
            No branches added to your chatbot.
         </p>
      }

      return <>

         <div className="fill-container" style={{ overflowY: 'auto' }}>
            <div className="p-3">
               <h4>CONFIGURE YOUR CHATBOT</h4>

               <h4 className="text-lg font-extrabold">
                  BRANCHES

                  <IconButton size="large" onClick={this.openBranchEditor}>
                     <AddIcon />
                  </IconButton>
               </h4>

               {branchesJSX}


            </div>
         </div>

         <BranchEditor
            open={this.state.branchEditorOpen}
            close={this.closeBranchEditor}
            parentBranch={this.state.newBranchParent}
         />

         <AddMedia
            open={this.state.mediaEditorOpen}
            branch={this.state.mediaBranch}
            close={this.closeMediaEditor}
         />


      </>
   }
}

export default ConfigureChat;
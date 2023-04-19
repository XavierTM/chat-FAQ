

// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Component from '@xavisoft/react-component';
import LazyloadImage from './LazyloadImage';
import { Button, ClickAwayListener } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import request from '../request';
import { hideLoading, showLoading } from '../loading';
import swal from 'sweetalert';
import { requestConfirmation } from '../utils';

const domain = window.cordova ? 'http://some-ip-address:8080' : 'http://localhost:8080';
const pdfUrl = "data:image/png;base64,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"

export default class MediaThumbnail extends Component {

   state = {
      showingActions: false
   }

   toggleActions = () => {
      const showingActions = !this.state.showingActions;
      return this.updateState({ showingActions });
   }

   delete = async () => {

      const { id, branchId } = this.props;
      const question = 'Are you sure?';
      const confirmation = await requestConfirmation({ question });

      if (!confirmation)
         return;
      
      try {
         showLoading();
         await request.delete(`/api/media/${id}`);
         this.props.delete(branchId, id);
      } catch (err) {
         swal(String(err))
      } finally {
         hideLoading();
      }
   }

   render() {
      const { ext, id } = this.props;
      const url = `${domain}/media/${id}.${ext}`;

      let src;

      if (ext === 'pdf') {
         src = pdfUrl
      } else {
         src = url
      }

      let actionsJSX;

      if (this.state.showingActions && this.props.adminMode) {
         actionsJSX = <ClickAwayListener onClickAway={this.toggleActions}>
            <div
               style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  background: 'rgba(0, 0, 0, 0.7)'
               }}
               className='text-center vh-align'
            >
               <Button className='text-white' onClick={this.delete}>
                  <DeleteIcon />
               </Button>
            </div>
         </ClickAwayListener>
      }

      
      return <div
         style={{
            width: 100,
            display: 'inline-block',
            marginRight: 5,
            height: 100,
            overflow: 'hidden',
            position: 'relative'
         }}
         onClick={this.toggleActions}
      >
         <div className='fill-parent vh-align'>
            <LazyloadImage src={src} aspectRation={1} />
         </div>

         {actionsJSX}
         
      </div>
   }
}
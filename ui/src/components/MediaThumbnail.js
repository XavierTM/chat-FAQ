

// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Component from '@xavisoft/react-component';
import LazyloadImage from './LazyloadImage';
import { Button, ClickAwayListener } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import request from '../request';
import { hideLoading, showLoading } from '../loading';
import swal from 'sweetalert';
import { requestConfirmation } from '../utils';
import PreviewIcon from '@mui/icons-material/Preview';
import PreviewMedia from './PreviewMedia';

const domain = window.cordova ? 'http://some-ip-address:8080' : 'http://localhost:8080';

export default class MediaThumbnail extends Component {

   state = {
      showingActions: false,
      previewMediaData: null,
   }

   openMediaPreview = () => {
      const { ext, id } = this.props;
      const src = `${domain}/media/${id}.${ext}`;

      const previewMediaData = { src, ext }
      return this.updateState({ previewMediaData })
   }

   closeopenMediaPreview = () => {
      return this.updateState({ previewMediaData: null })
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

      let actionsJSX;

      if (this.state.showingActions) {

         let buttonsJSX;

         if (this.props.adminMode) {
            buttonsJSX = <Button className='text-white' onClick={this.delete}>
               <DeleteIcon />
            </Button>
         } else {
            buttonsJSX = <>
               <Button className='text-white' onClick={this.openMediaPreview}>
                  <PreviewIcon />
               </Button>
            </>
         }

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
               {buttonsJSX}
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
            <LazyloadImage src={url} aspectRation={1} />
         </div>

         {actionsJSX}
         <PreviewMedia
            open={!!this.state.previewMediaData}
            {...(this.state.previewMediaData || {})}
            close={this.closeopenMediaPreview}
         />
         
      </div>
   }
}
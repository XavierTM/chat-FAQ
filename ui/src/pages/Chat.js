
import { Button } from '@mui/material';
import request from '../request';
import { delay, formatLinks, formatNewLines } from '../utils';
import Page from './Page';
import MediaThumbnail from '../components/MediaThumbnail';

const MESSAGE_DIRECTIONS = {
   INCOMING: 'incoming',
   OUTGOING: 'outgoing'
}

function Message(props) {

   const textAlign = props.direction === MESSAGE_DIRECTIONS.INCOMING ? 'left' : 'right';

   return <div style={{ textAlign }}>
      <div className='rounded-lg text-sm bg-gray-100 inline-block text-left m-2 p-2' style={{ minWidth: 100, maxWidth: '70%' }}>
         {props.body}
      </div>
   </div>
}

export default class Chat extends Page {

   state = {
      chatHistory: [],
   }

   updateState(update={}) {
      return new Promise((resolve) => {
         const newState = { ...this.state, ...update}
         this.setState(newState, resolve);
      })
   }

   addMessageToChat = async (body, direction) => {

      const chatHistory = [ ...this.state.chatHistory, { body, direction } ];
      await this.updateState({ chatHistory });

      const divChat = document.getElementById('div-chat');
      divChat.scrollTo(0, divChat.scrollHeight);

   }

   processMessage = async (id=null) => {

      let res;

      while (!res) {
         try {
            res = await request.get(`/api/branches/${id}`);
         } catch {
            await delay(3000);
         }
      }

      const responseData = res.data;

      const body = <>

         <h4 className='my-1'>{responseData.title}</h4>

         <p>
            {formatNewLines(formatLinks(responseData.body))}
         </p>

         {
            responseData.media.map(item => {
               return <MediaThumbnail 
                  {...item} 
                  key={item.id}
               />
            })
         }

         {
            responseData.branches.map(branch => {
               return <div>
                  <Button 
                     onClick={
                        async () => {
                           const body = branch.title;
                           const direction = MESSAGE_DIRECTIONS.OUTGOING;
                           await this.addMessageToChat(body, direction)
                           this.processMessage(branch.id);
                        }
                     }
                     style={{
                        textTransform: 'none',
                        color: '#0000EE'
                     }}
                  >
                     {branch.title}
                  </Button>
               </div>
            })
         }
      </>

      const direction = MESSAGE_DIRECTIONS.INCOMING;
      return this.addMessageToChat(body, direction);
   }

   onKeyUp = async (e) => {
      if (e.keyCode !== 13)
         return;

      const txtMessage = document.getElementById('txt-message');
      const message = txtMessage.value;

      if (!message)
         return;

      txtMessage.value = '';

      await this.addMessageToChat(message, MESSAGE_DIRECTIONS.OUTGOING);
      this.processMessage();
      
   }

   _render() {
      const chatHistoryJSX = this.state.chatHistory.map(message => <Message {...message} />);

      return <div 
         className='fill-container grid'
         style={{
            gridTemplateRows: 'auto 90px'
         }}
      >

         <div style={{ overflow: 'auto' }} id='div-chat' className='px-5'>

            <h4 className='text-3xl text-gray-500'>Say "Hi" to your chatbot</h4>

            {chatHistoryJSX}
         </div>

         <div className='v-align px-5'>

            <div className='bg-teal-700 text-white px-5 py-2 rounded-xl' style={{ width: '100%' }}>

               <input
                  type='text'
                  id='txt-message'
                  onKeyUp={this.onKeyUp}
                  placeholder="Your message"
                  style={{
                     background: 'transparent',
                     outline: 'none',
                     border: 'none',
                     color: 'currentcolor'
                  }}
                  className='placeholder-white'
               />
            </div>

         </div>
         
      </div>
   }
}
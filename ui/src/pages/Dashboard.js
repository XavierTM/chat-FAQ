
import { ClickAwayListener, IconButton } from '@mui/material';
import Page from './Page';
import MenuIcon from '@mui/icons-material/Menu';
import SideMenu from '../components/SideMenu';
import ConfigureChat from '../components/ConfigureChat';
import ContactManager from '../components/ContactManager';


const menuItems = [
   { caption: 'Configure chat', value: 'chat-config' },
   { caption: 'Contacts', value: 'contacts' },
]


export default class Dashboard extends Page {

   state = {
      currentSideMenuValue: 'chat-config',
      showingSideMenu: false,
   }

   openSideMenu = () => {
      return this.updateState({ showingSideMenu: true });
   }

   closeSideMenu = () => {
      return this.updateState({ showingSideMenu: false });
   }

   onSideMenuChange = (currentSideMenuValue) => {
      const update = { currentSideMenuValue, showingSideMenu: false }
      return this.updateState(update);
   }

   
   _render() {

      let sideMenuJSX

      if (this.state.showingSideMenu) {

         sideMenuJSX = <ClickAwayListener onClickAway={this.closeSideMenu}>
            <div
               style={{
                  position: 'fixed',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 300,
                  padding: 0,
               }}
            >
               <SideMenu
                  items={menuItems}
                  current={this.state.currentSideMenuValue}
                  onChange={this.onSideMenuChange}
               />
            </div>
         </ClickAwayListener>
      }

      let contentAreaJSX;

      switch (this.state.currentSideMenuValue) {
         case 'chat-config':
            contentAreaJSX = <ConfigureChat />
            break;

         case 'contacts':
            contentAreaJSX = <ContactManager />
            break;
            
         default:
            break;
      }

      return <>
         <div style={{ gridTemplateRows: '70px auto'}} className='grid fill-container'>
            
            <div className='v-align' style={{ borderBottom: '1px grey solid'}}>
               <IconButton onClick={this.openSideMenu}>
                  <MenuIcon />
               </IconButton>

               <h4 className='text-2xl'>Dashboard</h4>

            </div>

            <div style={{ overflowY: 'auto' }}>
               {contentAreaJSX}
            </div>
         </div>

         {sideMenuJSX}
      </>
   }
}
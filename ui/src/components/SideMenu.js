import { Button } from "@mui/material";
import Component from "@xavisoft/react-component";
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from "react-pro-sidebar";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';


function logout() {
   window.authenticated = false;
   window.App.redirect('/');
}


export default class SideMenu extends Component {

   render() {

      const headerJSX = this.props.header || <h1 style={{ backgroundColor:'#1976d2', margin: 0, padding: 20 }}>Menu</h1>;
      
      return <div style={{ width: '100%', backgroundColor:'#1976d2', height: 'var(--window-height)', margin: 0, color: 'white', position: 'relative' }}>
         <ProSidebarProvider>
            {headerJSX}
            <Sidebar width="100%" backgroundColor='#1976d2'>
               <Menu>
                  {
                     this.props.items.map(item => {

                        const { value, caption } = item;
                        const fontWeight = value === this.props.current ?  'bold' : undefined;

                        return <MenuItem
                           onClick={() => this.props.onChange(value)}
                           style={{
                              fontWeight,
                           }}
                        >
                           {caption}
                        </MenuItem>

                     })
                  }
               </Menu>
            </Sidebar>
         </ProSidebarProvider>

         <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={logout} 
            style={{ 
               color: 'white', 
               position: 'absolute',
               bottom: 30,
               right: 40,
            }}>
            LOGOUT
         </Button>
      </div>
   }
}
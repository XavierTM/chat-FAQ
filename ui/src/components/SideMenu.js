import { Button } from "@mui/material";
import Component from "@xavisoft/react-component";
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from "react-pro-sidebar";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import swal from "sweetalert";
import request from "../request";


async function logout() {
   try {
      await request.delete('/api/login');
      window.App.redirect('/login');
   } catch (err) {
      swal(String(err));
   }
}


export default class SideMenu extends Component {

   render() {

      const headerJSX = this.props.header || <h1 style={{ paddingLeft: 20 }}>Menu</h1>;
      
      return <div style={{ width: '300px', backgroundColor:'#1976d2', height: 'var(--window-height)', margin: 0, color: 'white', position: 'relative' }}>
         <ProSidebarProvider>
            {headerJSX}
            <Sidebar width="300px" backgroundColor='#1976d2'>
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
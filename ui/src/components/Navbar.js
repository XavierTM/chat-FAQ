import Component from "@xavisoft/react-component";
import AppBar from '@mui/material/AppBar';
import { connect } from "react-redux";
import DnsIcon from '@mui/icons-material/Dns';
import { IconButton } from "@mui/material";
import swal from "sweetalert";


function updateApiUrl() {

   let url = window.App.apiUrl;
   url = window.prompt('Provide server url:', url);

   if (!url)
      return;

   const regex = /^http:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{4}$/

   if (!regex.test(url)) {
      swal('Invalid server url. It should be in the format: http://XXX.XXX.XXX.XXX:XXXX');
      return;
   }

   window.App.apiUrl = url;

}



class Navbar extends Component {

   setDimensions = () => {
      const navbar = document.getElementById('navbar');
      
      const width = navbar.offsetWidth + 'px';
      const height = navbar.offsetHeight + 'px';

      document.documentElement.style.setProperty('--navbar-width', width);
      document.documentElement.style.setProperty('--navbar-height', height);
   }

   componentWillUnmount() {
      this.resizeOberver.disconnect();
   }

   componentDidMount() {
      const resizeOberver = new window.ResizeObserver(this.setDimensions);
      resizeOberver.observe(document.getElementById('navbar'));
      this.resizeOberver = resizeOberver;

      this.setDimensions();
   }

   render() {

      let jsx;

      if (this.props.currentRoute.indexOf('/dashboard') === -1) {
         jsx = <>
            <h2 className="font-extrabold text-2xl">CHAT-FAQ</h2>
            
            <div 
               style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 20,
               }}
               className="v-align"
            >
               <IconButton className="text-white" onClick={updateApiUrl}>
                  <DnsIcon fontSize="large" />
               </IconButton>
            </div>
         </>
      }
      
      return <AppBar style={{ paddingLeft: 20, position: 'relative' }} id="navbar">
         {jsx}
      </AppBar>
   }
}

function mapStateToProps(state) {
   return {
      currentRoute: state.currentRoute
   }
}


export default connect(mapStateToProps)(Navbar);
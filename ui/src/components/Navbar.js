import Component from "@xavisoft/react-component";
import AppBar from '@mui/material/AppBar';
import { connect } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";


function goHome() {
   window.App.redirect('/');
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
               <IconButton className="text-white" onClick={goHome}>
                  <HomeIcon fontSize="large" />
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
import Component from "@xavisoft/react-component";
import AppBar from '@mui/material/AppBar';
import { connect } from "react-redux";



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

      if (this.props.currentRoute.indexOf('/dashboard') === -1)
         jsx = <h1>CHAT-FAQ</h1>
      
      return <AppBar style={{ paddingLeft: 20 }} id="navbar">
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
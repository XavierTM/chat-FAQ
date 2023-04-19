
import Component from '@xavisoft/react-component';
import actions from '../actions';

class Page extends Component {

   componentDidMount() {
      const route = window.location.hash ? window.location.hash.substring(1) : '/'
      actions.setCurrentRoute(route);
   }

   _render() {
      return <div>Please implement <code>_render()</code></div>
   }

   render() {
      return <div className='page'>
         {this._render()}
      </div>
   }

}

export default Page;

import Component from '@xavisoft/react-component';
import actions from '../actions';

class Page extends Component {

   componentDidMount() {
      const route = window.location.pathname
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
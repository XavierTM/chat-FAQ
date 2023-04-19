import Page from "./Page";
import { Link } from '@xavisoft/app-wrapper';


function Item(props) {
   const { to, caption } = props;

   return <div>
      <Link to={to} className="text-lg no-underline bg-gray-100 block p-4 m-4 text-[#00E]">
         {caption}
      </Link>
   </div>
}

const links = [
   { to: '/chat', caption: 'Go to chat' },
   { to: '/contacts', caption: 'Browse contacts' },
   { to: '/login', caption: 'Login' },
]


export default class Home extends Page {

   _render() {

      return <div className="fill-container vh-align">
         <div className="text-center text-gray-700" style={{ width: '100%' }}>
            <h1 className="text-5xl">Welcome</h1>

            {
               links.map(link => <Item {...link} />)
            }
         </div>
      </div>
   }
}
import { ClickAwayListener } from "@mui/material";
import LazyloadImage from "./LazyloadImage";


export default function PreviewMedia(props) {

   if (props.open) {
      return <div 
         className="vh-align" 
         style={{ 
            background: 'rgba(0, 0, 0, 0.95)',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 4
         }}
      >
         <ClickAwayListener onClickAway={props.close}>
            <div style={{ width: '100%' }} className="bg-gray-500">
               <LazyloadImage
                  src={props.src}
                  objectFit="contain"
                  aspectRatio={1}
               />
            </div>
         </ClickAwayListener>
      </div>
   }

   
}
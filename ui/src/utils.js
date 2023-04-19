import swal from "sweetalert";


function delay(millis) {
   return new Promise(resolve => {
      setTimeout(resolve, millis);
   })
}

function formatTimeForDisplay(date) {
   date = new Date(date);
   return date.toLocaleString();
}

function flattenBranches(branches) {

   if (!branches || branches.length === 0)
      return [];

   const flattenedBranches = [];

   branches.forEach(branch => {
      flattenedBranches.push(branch);
      flattenedBranches.push(...flattenBranches(branch.branches));
   });

   return flattenedBranches;
}

function requestConfirmation({
   question,
   confirmButtonCaption='Yes',
   cancelButtonCaption="Cancel",
}) {
   return swal({
      text: question,
      buttons: [
         {
            text: confirmButtonCaption,
            value: true,
            className: "bg-red-600 text-white",
            visible: true,
         },
         {
            text: cancelButtonCaption,
            value: false,
            visible: true,
            className: "bg-white text-gray-600"
         }
      ]
   });
}


function formatLinks(text) {

   if (Array.isArray(text)) {
      return text.map(token => formatLinks(token))
   }

   if (typeof text !== 'string')
      return text;


   const regex = /((http|https|ftp):\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
   const matches = text.match(regex);
   const result = [];
   let currentText = text;

   for (let i in matches) {
      const match = matches[i];
      const splitted = currentText.split(match);

      result.push(splitted[0]);
      result.push(<a href={match}>{match}</a>);

      currentText = splitted.slice(1).join(match); // join in case the match was multiple

   }

   result.push(currentText);

   return result;

}

function formatNewLines(text) {
   if (Array.isArray(text)) {
      return text.map(token => formatNewLines(token))
   }
   
   if (typeof text !== 'string')
      return text;

   const splitted = text.split('\n');
   const result = [ splitted[0] ];

   for (let i = 1; i < splitted.length; i++) {
      result.push(<br/>);
      result.push(splitted[i]);
   }

   return result;

}

window.formatLinks = formatLinks


export {
   delay,
   flattenBranches,
   formatLinks,
   formatNewLines,
   formatTimeForDisplay,
   requestConfirmation,
}
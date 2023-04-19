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


export {
   delay,
   flattenBranches,
   formatTimeForDisplay,
   requestConfirmation,
}


function delay(millis) {
   return new Promise(resolve => {
      setTimeout(resolve, millis);
   })
}

function formatTimeForDisplay(date) {
   date = new Date(date);
   return date.toLocaleString();
}


export {
   delay,
   formatTimeForDisplay,
}
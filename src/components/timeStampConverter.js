export default function timeStampConverter(unixtimestamp){

   
    // Convert timestamp to milliseconds
    const date = new Date(unixtimestamp*1000);
   
    // Year
    const year = date.getFullYear();
   
    // Month
    const month = date.getMonth();
   
    // Day
    const day = date.getDate();
   
    // Hours
    const hours = date.getHours();
   
    // Minutes
    const minutes = "0" + date.getMinutes();
   
   
    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = hours + ':' + minutes.substr(-2) +' |  date: '+ day+'/'+month+'/'+year;
    
   return convdataTime;
    
   }
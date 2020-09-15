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
   
    // Seconds
    const seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +' time: '+ day+'/'+month+'/'+year;
    
   return convdataTime;
    
   }
//Run this code once otherwise files will append more time

/* Append sc and st csv file to general_sc_st_merge_csv csv */

//Adding the required modules
var fs=require('fs');

//Function to read the required file and append in the target file
function ReadAppend(file,appendFile){

  //Reading the append file
 fs.readFile(appendFile,function(err,data){
   if(err){

     //File not there means the throw the error to console
     throw err;
   }

   console.log('File was Read');

   //Appending the append file
   fs.appendFile(file,data,function(err){

     if(err){

       //File not there means the throw the error to console
       throw err;
     }

     console.log('The "data to append" was appended to a file');
     });
   });
}

//Setting the source and target files
file='../csv/general_sc_st_merge_csv.csv';
appendFile='../csv/sc_csv.csv';

//Calling the ReadAppend function
file = ReadAppend(file,appendFile);
appendFile='../csv/st_csv.csv';

ReadAppend(file,appendFile);

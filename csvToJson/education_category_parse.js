var fileSystem = require('fs');
var stream = require('stream');
var readLine = require('readline');

//input and output stream
var inputStream = fileSystem.createReadStream('csv/general_sc_st_merge_csv.csv');
var outputStream = new stream();


var obj = readLine.createInterface(inputStream, outputStream);
var eduArray = [];


obj.on('line', function(line) {
   var jsonObj = {};
   var cols = line.split(',');

   if (cols[3] === 'INDIA' && cols[4] === 'Total' && cols[5] === 'All ages') {
       if(eduArray.length===0){
           eduArray.push({
             'eduCat': 'literate',
             'totPop': +cols[12]
           });
           eduArray.push({
             'eduCat': 'Literaturewithouteducationlevel',
             'totPop': +cols[15]
           });
           eduArray.push({
             'eduCat': 'blwprimary',
             'totPop': +cols[18]
           });
           eduArray.push({
             'eduCat': 'primary',
             'totPop': +cols[21]
           });
           eduArray.push({
             'eduCat': 'middle',
             'totPop': +cols[24]
           });
           eduArray.push({
             'eduCat': 'matricsecon',
             'totPop': +cols[27]
           });
           eduArray.push({
             'eduCat': 'higherinterprepen',
             'totPop': +cols[30]
           });
           eduArray.push({
             'eduCat': 'nontechdipcertifinoteqdeg',
             'totPop': +cols[33]
           });
           eduArray.push({
             'eduCat': 'techdipcertifinoteqdeg',
             'totPop': +cols[36]
           });
           eduArray.push({
             'eduCat': 'gradabv',
             'totPop': +cols[39]
           });
           eduArray.push({
             'eduCat': 'unclas',
             'totPop': +cols[42]
           });
       }
       else{
         eduArray[0]['totPop'] =eduArray[0]['totPop'] + +cols[12];
         eduArray[1]['totPop'] =eduArray[1]['totPop'] + +cols[15];
         eduArray[2]['totPop'] =eduArray[2]['totPop'] + +cols[18];
         eduArray[3]['totPop'] =eduArray[3]['totPop'] + +cols[21];
         eduArray[4]['totPop'] =eduArray[4]['totPop'] + +cols[24];
         eduArray[5]['totPop'] =eduArray[5]['totPop'] + +cols[27];
         eduArray[6]['totPop'] =eduArray[6]['totPop'] + +cols[30];
         eduArray[7]['totPop'] =eduArray[7]['totPop'] + +cols[33];
         eduArray[8]['totPop'] =eduArray[8]['totPop'] +  +cols[36];
         eduArray[9]['totPop'] =eduArray[9]['totPop'] +  +cols[39];
         eduArray[10]['totPop'] = eduArray[10]['totPop'] + +cols[42];

       }
   }
});
obj.on('close', function() {
   fileSystem.writeFile('json/education_category_json.json', JSON.stringify(eduArray, null, 2), 'utf8', function(error) {
       if (error) {
           console.log(error);
       }
   });
});

// /* Education wise csv to json parsing */
//
// //Adding the required node modules
// var fs = require('fs');
// var readline = require('readline');
// var stream = require('stream');
//
// //Creating Streams to read csv file
// var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
// var outstream = new stream();
//
// //Creating Interface for user interaction
// var rl = readline.createInterface(instream, outstream);
//
// //Array for storing categories literature details
// var categories = [];
//
// //function to find index of category group
// function findIndexEdu(eduGroup,i){
//   var j = categories.length;
//   var index = -1;
//
//   //Loop to find the index of categories group
//   while(j--){
//     if(eduGroup == categories[j][i]){
//       index = j;
//       break;
//     }
//   }
//
//   //Returning the index of categories group
//   return index;
// }
//
//
// //Reading the csv file line by line
// rl.on('line', function(line) {
//     var currentLine = line.split(',');
//
//     //Checking conditions for picking the required line
//     if(row[3] === 'INDIA' && row[5] === "All ages" && row[4] === 'Total'){
//
//       var eachObj = {};
//
//       //for loop for catchup all the required column values
//       for(var i = 12;i < 40;i += 3){
//         //Calling findIndexAge funcion for finding the index of the age group
//         var index = findIndexEdu(currentLine[i],i);
//         eachObj['eduCateg'] = currentLine[i];
//         //Index available means sum and store the popoulation in result
//         if(index != -1){
//           var result = categories[index];
//           result['totalPop'] += eachObj['totalPop'];
//           categories[index] = result;
//         }
//         else{
//           categories.push(eachObj);
//         }
//       }
//     }
// });
// //End of rl.line
//
// //Creating Json file from the age and population in csv
// rl.on('close', function() {
//     fs.writeFile('../json/education_category_json.json', JSON.stringify(categories, null, 2), 'utf8', function(error) {
//
//         //Incase file not preseent error message will appear on console
//         if (error) {
//             console.log(error);
//         }
//     });
// });
// //End of rl.close


// /* Education category csv to json */
//
// //Adding the required modules
// var fs = require('fs');
// var readline = require('readline');
// var stream = require('stream');
//
// //Creating Streams to read csv file
// var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
// var outstream = new stream();
//
// //Creating Interface for user interaction
// var rl = readline.createInterface(instream, outstream);
//
// //Array for storing education category details
// var categories = [];
//
// var eachObj = {};
//
// //Reading the csv file line by line
// rl.on('line', function(line) {
//  var row = line.split(',');
//
//  //Checking conditions for picking the required line
//  if(row[3] === 'INDIA' && row[5] === "All ages" && row[4] === 'Total'){
//
//    //Checking the presence of data in categories
//    if(categories.length === 0){
//
//      //Pushing data into categories for the first time
//      categories.push({
//                       'Literate': +row[12],
//                       'LiteratewithoutEducation': +row[15],
//                       'BelowPrimary': +row[18],
//                       'Primary': +row[21],
//                       'Middle': +row[24],
//                       'MatricSecondary': +row[27],
//                       'HighersecondaryIntermediatePreUniversitySeniorsecondary': +row[30],
//                       'Nontechnicaldiplomaorcertificatenotequaltodegree': +row[33],
//                       'Technicaldiplomaorcertificatenotequaltodegree': +row[36],
//                       'Graduateabove': +row[39],
//                       'Unclassified' : +row[42]
//                     });
//                     //End of pushing data into categories for the first time
//     }else{
//
//         //Updating data into categories
//        categories[0]['Literate'] =  categories[0]['Literate'] + +row[12];
//        categories[0]['LiteratewithoutEducation'] = categories[0]['LiteratewithoutEducation'] + +row[15];
//        categories[0]['BelowPrimary'] = categories[0]['BelowPrimary'] + +row[18];
//        categories[0]['Primary'] = categories[0]['Primary'] + +row[21];
//        categories[0]['Middle'] = categories[0]['Middle'] + +row[24];
//        categories[0]['MatricSecondary'] = categories[0]['MatricSecondary'] + +row[27];
//        categories[0]['HighersecondaryIntermediatePreUniversitySeniorsecondary'] =  categories[0]['HighersecondaryIntermediatePreUniversitySeniorsecondary'] + +row[30];
//        categories[0]['Nontechnicaldiplomaorcertificatenotequaltodegree'] =  categories[0]['Nontechnicaldiplomaorcertificatenotequaltodegree'] + +row[33];
//        categories[0]['Technicaldiplomaorcertificatenotequaltodegree'] =  categories[0]['Technicaldiplomaorcertificatenotequaltodegree'] + +row[36];
//        categories[0]['Graduateabove'] = categories[0]['Graduateabove'] + +row[39];
//        categories[0]['Unclassified'] = categories[0]['Unclassified'] + +row[42];
//      }
//      //Updating categories of else ends
//    }
//    //condition if ends
// });
// //End of rl.line
//
// //Creating json file from the education category population in csv
// rl.on('close', function() {
//     fs.writeFile('../json/education_category_json.json', JSON.stringify(categories, null, 2), 'utf8', function(error) {
//
//         //Incase file not preseent error message will appear on console
//         if (error) {
//             console.log(error);
//         }
//     });
// });
// //End of rl.close

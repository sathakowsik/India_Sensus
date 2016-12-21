/* State gender draduate csv to json */

//Adding the required modules
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

//Creating Streams to read csv file
var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
var outstream = new stream();

//Creating Interface for user interaction
var rl = readline.createInterface(instream, outstream);

//Array for storing state male and female graduate details
var graddata = [];

//function to find index of state name
function findIndexGrad(state) {
   state = state.substr(8, (state.length - 1));
   var index = null;
   for (var i = 0; i < graddata.length; i++) {
       if (state == graddata[i]['StateName']) {
           index = i;
           break;
       }
   }
   return index;
}

//Reading the csv file line by line
rl.on('line', function(line) {
   var cols = line.split(',');

   if (cols[3] != 'INDIA' && cols[4] === 'Total' && cols[5] == 'All ages') {
       var state = cols[3];
       state = state.substr(8, (state.length - 1));
       jsonObj = {};
       jsonObj['StateName'] = state;
       jsonObj['Total male'] = +cols[40];
       jsonObj['Total female'] = +cols[41];
       var index = findIndexGrad(cols[3]);
       if (index != null) {
           var result = graddata[index];
           result['Total male'] += jsonObj['Total male'];
           result['Total female'] += jsonObj['Total female'];
           graddata[index]=result;
       } else {
           graddata.push(jsonObj);
       }
   }
});
//End of rl.line

//Creating json file from the state male and female graduate population in csv
rl.on('close', function() {
    fs.writeFile('../json/state_gender_graduate_json.json', JSON.stringify(graddata, null, 2), 'utf8', function(error) {

        //Incase file not preseent error message will appear on console
        if (error) {
            console.log(error);
        }
    });
});
//End of rl.close

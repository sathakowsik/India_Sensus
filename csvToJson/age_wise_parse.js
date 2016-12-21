/* Age wise csv to json parsing */

//Adding the required node modules
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

//Creating Streams to read csv file
var instream = fs.createReadStream('../csv/general_sc_st_merge_csv.csv');
var outstream = new stream();

//Creating Interface for user interaction
var rl = readline.createInterface(instream, outstream);

//Array for storing agewise literature details
var agedata = [];

//function to find index of age group
function findIndexAge(ageGroup){
  var i = agedata.length;
  var index = -1;

  //Loop to find the index of age group
  while(i--){
    if(ageGroup == agedata[i]['agegroup']){
      index = i;
      break;
    }
  }

  //Returning the index of age group
  return index;
}

//Reading the csv file line by line
rl.on('line', function(line) {
    var eachObj = {};
    var currentLine = line.split(',');

    //Checking conditions for picking the required line
    if(currentLine[3] == 'INDIA' && currentLine[4] == 'Total'){

      //Storing the age group and respective population in each object
      eachObj['agegroup'] = currentLine[5];
      eachObj['population'] = +currentLine[12];

      //Calling findIndexAge funcion for finding the index of the age group
      var index = findIndexAge(currentLine[5]);

      //Index available means sum and store the popoulation in result
      if(index != -1){
        var result = agedata[index];
        result['population'] += eachObj['population'];
        agedata[index] = result;
      }
      else{
        agedata.push(eachObj);
      }
    }
});
//End of rl.line

//Creating Json file from the age and population in csv
rl.on('close', function() {
    fs.writeFile('../json/age_wise_json.json', JSON.stringify(agedata, null, 2), 'utf8', function(error) {

        //Incase file not preseent error message will appear on console
        if (error) {
            console.log(error);
        }
    });
});
//End of rl.close

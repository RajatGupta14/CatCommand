#!/usr/bin/env node

let fs = require("fs")

let cmd = process.argv.slice(2);

(function () {
    let options = [];
    let files = [];
    let str = "";
    for(let x in cmd){
        if(cmd[x].startsWith("-") && cmd[x].length==2){
            options.push(cmd[x]);
        } else {
            files.push(cmd[x]);
        }
    }

    for(x in files){
        if(!fs.existsSync(files[x])){
            console.log(files[x] + "does not exists");
            return;
        }
    }

    for (let x in files){
        str += fs.readFileSync(files[x].toString());
    }

    str = str.split("\n");

    if(options.includes("-s")){
        str = removeLargeSpace(str);
    }

if(options.includes("-n") && options.includes("-b")){
    //both options are given by user

    if(options.includes("-n") > options.includes("-b")){
        // execute -n
        str = addNum(str);
    } else {
        // execute -b
       str =  addNonEmptyNum(str);
    }
  } else {
      //either one or none option is given by user
      if (options.includes("-b")) {
          // execute -b
         str = addNonEmptyNum(str);
      } else if(options.includes("-n")){
          // execute -n
         str = addNum(str);
      }
  }

    str = str.join("\n");

    console.log(str);
})();

function removeLargeSpace(arr){
    let ans = [];
    for(let i =0; i <arr.length; i++){
        let prev = arr[i];
        let curr = arr[i+1];
        if((prev == "" && curr == "") || (prev == "\r" && curr == "\r")){
        } else {
            ans.push(arr[i]);
        }
    }
    return ans;

    // This function can be executed in one more Way
    // let ans = [];
    // let flag = false;
    // for(let i = 0 ; i < arr.length;i++){
    //     if(arr[i]!=""){
    //         flag = false;
    //         ans.push(arr[i]);
    //     } else {
    //         if(!flag){
    //             flag = true ;
    //             ans.push(arr[i]);
    //         }
    //     }
    // }
}

//-n
function addNum(arr) {
    //will add number to all the elements of array
    let nArr = [];
    for(x in arr){
        nArr[x] = (Number(x)+1) +" "+ arr[x];
    }
    return nArr;
}

//-b
function addNonEmptyNum(arr){
    //Will add number to only non empty elements of array
    let nArr = [];
    let lineNumber = 1;
    for(x in arr){
        if(arr[x]=="\r" || arr[x] == ""){
            nArr[x] = arr[x];
        } else {
            nArr[x] = lineNumber +" "+ arr[x];
            lineNumber++;
        }
    }
    return nArr;
}
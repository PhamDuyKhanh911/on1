var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "",
    secretAccessKey: ""
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allStudents = JSON.parse(fs.readFileSync('studentdata.json', 'utf8'));
allStudents.forEach(function(user) {
    var params = {
        TableName: "SinhVien",
        Item: {
            "ID":user.ID,
            "MSSV":user.MSSV, 
            "HoTen":user.HoTen,
            "NgaySinh":user.NgaySinh,      
            "Avata":user.Avata
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add users", user.HoTen, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.HoTen);
       }
    });
});
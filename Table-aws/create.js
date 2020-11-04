var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "",
    secretAccessKey: ""
  });
  var client = new AWS.DynamoDB();
var documentClient = new AWS.DynamoDB.DocumentClient();

var tableName = "SinhVien";

var params = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: "ID", KeyType: "HASH"},  //Partition key
        { AttributeName: "MSSV", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "ID", AttributeType: "S" },
        { AttributeName: "MSSV", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

client.createTable(params, function(tableErr, tableData) {
    if (tableErr) {
        console.error("Error JSON:", JSON.stringify(tableErr, null, 2));
    } else {
        console.log("Created table successfully!");
    }
});
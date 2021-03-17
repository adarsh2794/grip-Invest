const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { toast } = require('react-toastify')
const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'grip_invest',
    password:'mysql',
    multipleStatements: true
})

sqlConnection.connect((err) => {
    if (!err)
    console.log('DB connected')
    else
    console.log('DB connection failed' + JSON.stringify(err, undefined, 2))
})

router.post('/client', async (req, res) => {
    console.log(req.body)
    const { last, first, email, sold, date, owner, country,asset_type } = req.body
    let query = `INSERT INTO client VALUES (null, '${last}', '${first}', '${email}', 
    ${sold}, '${date}', '${owner}', '${country}',null,null,'${asset_type}')`;
    sqlConnection.query(query,function(err,result,fields){
        if(err)
        throw err;
        console.log("result is",result)
        res.send(result)
        
    });
    
})
router.post('/clients/search', async (req, res) => {
    console.log("Request body ",req.body);
    let ownerArray = [];
    let assetTypeArray = [];
    req.body.searchParamters.forEach(element => {
        if(element.key && element.key=='Owner')
        {
            ownerArray.push(element.value);
        }
        else if(element.key && element.key=='Asset Type')
        {
            assetTypeArray.push(element.value);
        }
    });
    if(assetTypeArray.length==0)
    assetTypeArray=req.body.assetType;
    if(ownerArray.length==0)
    ownerArray=req.body.ownerType;
    
    let assetString = stringifySqlArray(assetTypeArray);
    let ownserString = stringifySqlArray(ownerArray);
    let query = `select * from client where asset_type in(`+assetString+`) and owner in (`+ownserString+`)`;
    console.log("query is",query)
    sqlConnection.query(query,function(err,result,fields){
        
        if(err)
        throw err;
        console.log("result is")
        console.log(result);
        res.send(result)
        
    });
    
})

router.get('/clients',async(req,res)=>{
    let query = "select * from client"
    sqlConnection.query(query,function(err,result,fields){
        if(err)
        throw err;
        res.send(result);
    });
    
});
function stringifySqlArray(arr)
{
   return arr.map(function (a) { return "'" + a + "'"; }).join(",");
}
module.exports = router
var express = require('express');
var app = express();

app.get('/', (req, res)=>{res.sendFile('index.html', { root: __dirname });});
app.use(express.static('app'))
app.listen(8080, function()
{
	console.log("When Server Starts, Log This");
});
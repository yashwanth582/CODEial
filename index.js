const express = require('express');
const cookieParser = require('cookie-parser');
const app  = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
app.use(express.urlencoded());
/* is a method inbuilt in express to recognize the incoming 
Request Object as strings or arrays. This method is called as a 
middleware in your application using the code*/
app.use(cookieParser());
app.use(express.static('./assets'));  

app.use(expressLayouts);
// extact style and scripts from subpages into the layout 
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
// use express router 
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views','./views')
app.listen(port, function(err){
    if(err){console.log(`Error running the server: ${err}`)};
    console.log(`Server is running on port: ${port}`);
    
})
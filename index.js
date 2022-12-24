const express = require('express');
const env = require('./config/environment')
const logger  = require('morgan');
 
const cookieParser = require('cookie-parser');
const app  = express();
require('./config/view-helpers')(app)
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session)
const sassMiddleware = require('node-sass-middleware-5')
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware')
const cors = require('cors');
 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// Magic Lines
chatServer.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
 });
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
//setup the chat server to be used with socket.io
const path = require('path');
app.use(cors());
if(env.name == 'development'){
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path,'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
}
app.use(express.urlencoded({extended:true}));
/* is a method inbuilt in express to recognize the incoming 
Request Object as strings or arrays. This method is called as a 
middleware in your application using the code*/
app.use(cookieParser());
app.use(express.static(env.asset_path));  
// make the uploads paths available to browser
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);
// extact style and scripts from subpages into the layout 
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
 
app.set('view engine', 'ejs');
app.set('views','./views')
 
app.use(session({
    name: 'codeial',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        // mongooseConnection:db 
        mongoUrl: db._connectionString, 
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongo setup ok')
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMiddleware.setFlash);

// use express router  
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){console.log(`Error running the server: ${err}`)};
    console.log(`Server is running on port: ${port}`);
    
})
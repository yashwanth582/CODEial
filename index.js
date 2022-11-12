const express = require('express');
const cookieParser = require('cookie-parser');
const app  = express();
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

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({extended:true}));
/* is a method inbuilt in express to recognize the incoming 
Request Object as strings or arrays. This method is called as a 
middleware in your application using the code*/
app.use(cookieParser());
app.use(express.static('./assets'));  
// make the uploads paths available to browser
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(expressLayouts);
// extact style and scripts from subpages into the layout 
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
 
app.set('view engine', 'ejs');
app.set('views','./views')

app.use(session({
    name: 'codeial',
    secret:'blahsomeone',
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
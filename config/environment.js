const fs = require('fs');
const rfs = require('rotating-file-stream')
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'blahsomeone',
    db:'codeial_development',
    google_client_ID: "932000036472-b2joq33s7l2p2acep4e92pu787bhlo4n.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
 const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }
 }
// eval converts string to expression
 module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
 
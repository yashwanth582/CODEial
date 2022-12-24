const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomeone',
    db:'codeial_development',
    google_client_id: "932000036472-b2joq33s7l2p2acep4e92pu787bhlo4n.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'
}
 const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.GOOGLE_CALL_BACKURL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET
 }

 module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
 
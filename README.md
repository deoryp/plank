# plank
Boards for Friends

## Getting Started

** Install Requirements: **

- node, npm
- gulp
- bower
- 

** For development, **

- Use development mode

  `set NODE_ENV=development`
  
  and then create a `./server/config/passwords.js` file like
  
  ```
  module.exports = {
      host: 'localhost',
      port: 8000, 
      mongo: {
        db: 'mongodb://username:password:mongoserver:port/table'
      },
      google: {
          clientId: '<clientId>.apps.googleusercontent.com',
          email: '<email>@developer.gserviceaccount.com',
          clientSecret: '<clientSecret>'
          callback: 'http://localhost:1337/auth/google/callback'})
    };
  ```
  
  Google auth comes from https://console.developers.google.com/ in the APIs and auth section, under Credentials.

- Run
  
  `gulp serve`
  
  This does three major things:
  
  1. Runs the Server under a port, say :8000
  2. Runs the watch and serve for the Client on a port, say :3000
  3. Runs a proxy to tie the two together on a port, say 1337
  
  By default, this will launch those three things all at once and if you navigate to http://localhost:1337 and you have pointed google to the correct ports and permissions, this should allow you to login and see a dynamically updated client with a running server. The server does not auto-reload as of yet, so it needs a reboot if you are making server side changes. Client side changes should force the website to reload using browsersync.
  
  
TODO:: need to document how to test prod version of app.  
  
  
## License

[MIT](./LICENSE.md)

# ReactSite
https://way-to-work.herokuapp.com/

# Warning

If you want to be able to authenticate and authorize open the file router/register.js find this code 
```
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: secretData.email, // Paste your email
        pass: secretData.password // Paste pass for email
    },
    tls: {
        rejectUnauthorized: false
    }
});
```
and then paste your email and password from email

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

### Running Server
```
$ node index.js
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

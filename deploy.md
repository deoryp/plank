heroku login
git clone https://github.com/heroku/node-js-getting-started.git
cd node-js-getting-started/
heroku create
git push heroku master
heroku ps:scale web=1
heroku open
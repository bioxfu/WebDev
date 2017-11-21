express --view=jade
npm install

## Install Bootstrap and add it to the app
npm install --save bootstrap
cp -r node_modules/bootstrap/dist public/bootstrap

## Install jQuery and add it to the app
npm install --save jquery
cp node_modules/jquery/dist/jquery.min.js public/javascripts

## Changing the folder structure
mkdir app_server
mkdir app_server/models
mkdir app_server/controllers
mv views app_server
mv routes app_server

## Using the new views and routes folders
cat app.js |sed "s/path.join(__dirname, 'views')/path.join(__dirname, 'app_server', 'views')/" \
| sed "s/\/routes\//\/app_server\/routes\//" > tmp; mv tmp app.js

## Splitting controllers from routes
echo -e "module.exports.index = function(req, res) {\n  res.render('index', { title: 'Express' });\n};" > app_server/controllers/main.js

cat app_server/routes/index.js | sed 's/function(req, res, next) {/ctrlMain.index);/' \
| sed "s/res.render('index', { title: 'Express' });//" \
| sed 's/});//' \
| sed "s/express.Router();/express.Router();\nvar ctrlMain = require('..\/controllers\/main');/" > tmp
mv tmp app_server/routes/index.js

## Adding Bootstrap to the template
cp WebDev/jade/layout.jquery app_server/views/layout.jade

echo WebDev > .gitignore

## initiate
express --view=jade

## install modules
npm install
npm install --save mongoose
npm install --save bootstrap
npm install --save jquery
npm install --save request
cp -r node_modules/bootstrap/dist public/bootstrap
cp node_modules/jquery/dist/jquery.min.js public/javascripts

## clone template
git clone -b chapter-07 https://github.com/simonholmes/getting-MEAN.git template
cp -r template/app_api .
cp -r template/app_server .
cp template/app.js .
rm -r routes views

echo WebDev > .gitignore
echo template >> .gitignore

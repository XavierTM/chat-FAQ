

# compile ui
cd ui
npm run build
cd  ..

# move to www
mv app/www/.gitignore __temp__.gitignore
rm -rf app/www
mv ui/build app/www
mv __temp__.gitignore app/www/.gitignore
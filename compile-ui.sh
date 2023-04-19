

# compile ui
cd ui
npm run build
cd  ..

# move to www
mv www/.gitignore __temp__.gitignore
rm -rf www
mv build www
mv __temp__.gitignore www/.gitignore
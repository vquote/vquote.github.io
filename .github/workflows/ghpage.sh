npm i;
npm run build;

# see https://github.com/actions/upload-pages-artifact?tab=readme-ov-file#artifact-validation
chmod 755 ./docs
chmod 744 ./docs/*

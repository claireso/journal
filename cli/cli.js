const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv);

const sourceFile = path.resolve('./app/data/photos.json');
const targetFile = path.resolve('./app/data/tmp-photos.json');

// TODO: check if file exists
const data = require(sourceFile);

const {
  title,
  description,
  src,
  position,
  portrait,
  square,
} = argv;

const newData = [
  {
    "title": title || "",
    "description": description || "",
    "src": src || "",
    "position": position || "",
    "portrait": portrait || false,
    "square": square || false,
  },
  ...data
];

const createTempFile = () => {
  return new Promise((resolve, reject) => {
    console.log('create new file');
    fs.writeFile(targetFile, JSON.stringify(newData), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const deleteSourceFile = () => {
  return new Promise((resolve, reject) => {
    console.log('delete source file');
    fs.unlink(sourceFile, (err) => {
      if (err) {
        reject(err);
        return;
      };
      resolve();
    });
  });
};

const renameFile = () => {
  return new Promise((resolve, reject) => {
    console.log('rename new file');
    fs.rename(targetFile, sourceFile, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

createTempFile()
  .then(deleteSourceFile)
  .then(renameFile)
  .then(() => {
    console.log('done!')
  })
  .catch((err) => {
    console.log('error!');
    console.log(err);
  });

const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv);

const sourceFile = path.resolve('./app/data/photos.json');
const targetFile = path.resolve('./app/data/tmp-photos.json');

const {
  title,
  description,
  src,
  position,
  portrait,
  square,
} = argv;

const entry = {
  title: title !== undefined ? title : '',
  description: description !== undefined ? description : '',
  src: src !== undefined ? src : '',
  position: position !== undefined ? position : '',
  portrait: portrait !== undefined ? !!portrait : false,
  square: square !== undefined ? !!square : false,
}

//get data
const getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // file does not exist
          resolve([]);
        }
        reject(err);
        return;
      }

      try {
        data = JSON.parse(data);
        Array.isArray(data) ? resolve(data) : resolve([]);
      } catch(err) {
        reject(err)
      }
    });
  });
}

const createTmpFile = (data) => {
  //create new file with data and entry
  return new Promise((resolve, reject) => {
    fs.writeFile(targetFile, JSON.stringify([entry, ...data]), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

}

const renameFile = () => {
  return new Promise((resolve, reject) => {
    fs.rename(targetFile, sourceFile, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

getData()
  .then(createTmpFile)
  .then(renameFile)
  .then(() => {
    console.log('New photo was added successfully:');
    console.log(entry);

  })
  .catch((err)=> {
    console.log('Something wrong happened');
    console.log(err);
  });


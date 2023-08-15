const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Product';

function resetDatabase() {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log('Connected to MongoDB');

    const db = client.db('Product');

    db.listCollections().toArray(function(err, collections) {
      if (err) throw err;

      collections.forEach(function(collection) {
        db.collection(collection.name).drop(function(err, result) {
          if (err) throw err;
          console.log(`Collection ${collection.name} dropped`);
        });
      });

      console.log('Database reset completed');
      client.close();
    });
  });
}

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetDatabase);
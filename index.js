// Memilih Database

// use belajar         // memilih database belajar
// use hello           // memilih database hello
// show databases      // menampilkan semua database

// db.dropDatabase();    // Menghapus database
// db.getName();         // Mengambil nama database
// db.hostInfo();        // Mengambil informasi host tempat mongodb
// db.version();         // Mengambil versi database
// db.stats();           // Mengambil statistik penggunaan database

// Collections
// db.getCollectionNames()      // Mengambil semua nama collection
// db.createCollection(name)    // Membuat collection baru
// db.getCollection(name)       // Mendapatkan object collection
// db.<name>                    // Sama dengan db.getCollection(<name>)
// db.getCollectionInfos()      // Mendapat informasi semua collection

// db.<collection>.find()       // Mengambil semua document
// db.<collection>.count()      // Mengambil jumlah document
// db.<collection>.drop()       // Menghapus collection
// db.<collection>.totalSize()  // Mengambil total ukuran collection
// db.<collection>.stats()      // Mengambil informasi statistik collection

db.createCollection("customers"); // Membuat collection customers
db.createCollection("products"); // Membuat collection products
db.createCollection("orders"); // Membuat collection orders

// Insert Document
// db.<collection>.insertOne(document)         // Menambah dokumen ke collection
// db.<collection>.insertMany(array<document>) // Menambah semua dokumen di array ke collection

// insert customers document
db.customers.insertOne({
  _id: "Rizal",
  name: "Rizal",
});

// insert products document
db.products.insertMany([
  {
    _id: 1,
    name: "Indomie Ayam Bawang",
    price: new NumberLong("2000"),
  },
  {
    _id: 2,
    name: "Mie Sedap Soto",
    price: new NumberLong("2000"),
  },
]);

// insert orders document
db.orders.insertOne({
  _id: new ObjectId(),
  total: new NumberLong("4000"),
  items: [
    {
      product_id: 1,
      price: new NumberLong("2000"),
      quantity: new NumberInt("2"),
    },
    {
      product_id: 2,
      price: new NumberLong("2000"),
      quantity: new NumberInt("2"),
    },
  ],
});

// Query Document
// db.<collection>.find(query)   // Mencari document dengan query

// SELECT * FROM customers WHERE _id = "Rizal"
db.customers.find({
  _id: "Rizal",
});

// SELECT * FROM products WHERE price = 2000
db.products.find({
  price: 2000,
});

// SELECT * FROM orders WHERE items.product_id = 1
db.orders.find({
  "items.product_id": 1,
});

// Comparison Query Operator
// $eq      // Membandingkan value dengan value lain
// $gt      // Membandingkan value lebih besar dari value lain
// $gte     // Membandingkan value lebih besar atau sama dengan value lain
// $lt      // Membandingkan value lebih kecil dari value lain
// $lte     // Membandingkan value lebih kecil atau sama dengan value lain

// $in      // Membandingkan value dengan value yang ada di array
// $nin     // Membandingkan value tidak ada dalam value yang ada di array
// $ne      // Membandingkan value tidak sama dengan value lain

db.products.insertMany([
  {
    _id: 3,
    name: "Pop Mie Rasa Bakso",
    price: new NumberLong("2500"),
    category: "food",
  },
  {
    _id: 4,
    name: "Samsung Galaxy S9+",
    price: new NumberLong("10000000"),
    category: "handphone",
  },
  {
    _id: 5,
    name: "Acer Predator XXI",
    price: new NumberLong("25000000"),
    category: "laptop",
  },
]);

// SELECT * FROM products WHERE price >= 2000
db.products.find({
  price: {
    $gt: 2000,
  },
});

// SELECT * FROM products WHERE category IN ("handphone", "laptop") AND price >= 100000
db.products.find({
  category: {
    $in: ["handphone", "laptop"],
  },
  price: {
    $gt: 100000,
  },
});

// Logical Query Operator
// $and    // Menggabungkan query dengan operasi AND, mengembalikan document jika semua kondisi benar
// $or     // Menggabungkan query dengan operasi OR, mengembalikan document jika salah satu kondisi benar
// $nor    // Menggabungkan query dengan operasi NOR, mengembalikan document yang gagal di semua kondisi
// $not    // Membalikkan kondisi, mengembalikan document yang tidak sesuai kondisi

// SELECT * FROM products WHERE category IN ("handphone", "laptop") AND price >= 100000
db.products.find({
  $and: [
    {
      category: {
        $in: ["handphone", "laptop"],
      },
    },
    {
      price: {
        $gt: 100000,
      },
    },
  ],
});

// SELECT * FROM products WHERE category NOT IN ("handphone", "laptop")
db.products.find({
  category: {
    $not: {
      $in: ["handphone", "laptop"],
    },
  },
});

// SELECT * FROM product WHERE price BETWEEN 1000000 AND 2500000 AND category != food
db.products.find({
  price: {
    $gte: 10000000,
    $lte: 25000000,
  },
  category: {
    $ne: "food",
  },
});

// Element Query Operator
// $exists     // Mencocokkan document yang memiliki field tersebut
// $type       // Mencocokkan document yang memiliki type field tersebut

// SELECT * FROM products WHERE category NOT NULL
db.products.find({
  category: {
    $exists: false,
  },
});

// SELECT * FROM products WHERE type(category) = "string"
db.products.find({
  category: {
    $type: "string",
  },
});

// SELECT * FROM products WHERE type(price) IN ("int", "long")
db.products.find({
  price: {
    $type: ["int", "long"],
  },
});

// Evaluation Query Operator
// $expr           // Menggunakan aggregation operation
// $jsonSchema     // Validasi document sesuai dengan JSON schema : https://json-schema.org/
// $mod            // Melakukan operasi modulo
// $regex          // Mengambil document sesuai dengan regular expression (PCRE)
// $text           // Melakukan pencarian menggunakan text
// $where          //  Mengambil document dengan JavaScript Function

// $expr operator
// SELECT * FROM customers WHERE _id = name
db.customers.find({
  $expr: {
    $eq: ["$_id", "$name"],
  },
});

// $jsonSchema operator
// SELECT * FROM products WHERE name IS NOT NULL AND category IS NOT NULL
db.products.find({
  $jsonSchema: {
    required: ["name", "category"],
  },
});
// SELECT * FROM products WHERE name IS NOT NULL AND type(name) = "string" AND type(price) = "number"
db.products.find({
  $jsonSchema: {
    required: ["name"],
    properties: {
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
    },
  },
});

// $mod operator
// SELECT * FROM products WHERE price % 5 = 0
db.products.find({
  price: {
    $mod: [5, 0],
  },
});
// SELECT * FROM products WHERE price % 1000000 = 0
db.products.find({
  price: {
    $mod: [1000000, 0],
  },
});

// $regex operator
// SELECT * FROM products WHERE name LIKE %mie%
db.products.find({
  name: {
    $regex: /mie/,
    $options: "i",
  },
});
// SELECT * FROM products WHERE name LIKE Mie%
db.products.find({
  name: {
    $regex: /^Mie/,
  },
});

// $where operator
db.customers.find({
  $where: function () {
    return $this._id == $this.name;
  },
});

// Array Query Operator
// $all        // Mencocokkan array yang mengandung elemen-elemen tertentu
// $elemMatch  // Mengambil document jika tiap element di array memenuhi kondisi tertentu
// $size       // Mengambil document jika ukuran array sesuai

db.products.insertMany([
  {
    _id: 6,
    name: "Logitech Wireless Mouse",
    price: new NumberLong("175000"),
    category: "mouse",
    tags: ["logitech", "mouse", "accessories"],
  },
  {
    _id: 7,
    name: "Cooler Pad Gaming",
    price: new NumberLong("200000"),
    category: "laptop",
    tags: ["cooler", "laptop", "accessories", "fan"],
  },
  {
    _id: 8,
    name: "Samsung Curved Monitor",
    price: new NumberLong("25000000"),
    category: "computer",
    tags: ["samsung", "monitor", "computer"],
  },
]);

// $all
// SELECT * FROM products WHERE (tags = "samsung" AND tags = "monitor")
db.products.find({
  tags: {
    $all: ["samsung", "monitor"],
  },
});

// $elemMatch
// SELECT * FROM products WHERE tags IN ("samsung", "logitech")
db.products.find({
  tags: {
    $elemMatch: {
      $in: ["samsung", "logitech"],
    },
  },
});

// $size
// SELECT * FROM products WHERE count(tags) = 3
db.products.find({
  tags: {
    $size: 3,
  },
});

// Projection Operator
// SELECT _id, name, category FROM products
db.products.find(
  {},
  {
    name: 1,
    category: 1,
  }
);
// SELECT _id, name, price, category FROM products
db.products.find(
  {},
  {
    tags: 0,
  }
);

// $           // Limit array hanya mengembalikan data pertama yang match denganarray operator
// $elemMatch  // Limit array hanya mengembalikan data pertama yang match dengankondisi query
// $meta       // Mengembalikan informasi metadata yang didapat dari setiapmatching document
// $slice      // Mengontrol jumlah data yang ditampilkan pada array

// $elemMatch
// SELECT _id, name, tags[first] FROM products
db.products.find(
  {},
  {
    name: 1,
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  }
);

// $
// SELECT _id, name, tags FROM products WHERE tags IS NOT NULL
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    "tags.$": 1,
  }
);

//  $slice
// SELECT _id, name, tags[0-1] FROM products WHERE tags IS NOT NULL
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    tags: {
      $slice: 2,
    },
  }
);

// Query Modifier
// count()     // Mengambil jumlah data hasil query
// limit(size) // Membatasi jumlah data yang didapat dari query
// skip(size)  // Menghiraukan data pertama hasil query sejumlah yang ditentukan
// sort(query) // Mengurutkan hasil data query

// count()
// SELECT count(*) FROM products
db.products.find().count();

// limit()
// SELECT * FROM products LIMIT 4
db.products.find().limit(4);

// skip()
// SELECT * FROM products OFFSET 2
db.products.find().skip(2);

// SELECT * FRON LIMIT 2 OFFSET 4
db.products.find().limit(2).skip(4);

// sort(query)
// SELECT * FROM products ORDER BY category ASC, name DESC
db.products.find().sort({
  category: 1,
  name: -1,
});

// Update Document
// updateOne()     // Mengubah satu document
// updateMany()    // Mengubah banyak document sekaligus
// replaceOne()    // Mengubah total satu document dengan document baru

// updateOne()
// UPDATE products SET category = "food" WHERE _id = 1
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $set: {
      category: "food",
    },
  }
);
// UPDATE products SET category = "food" WHERE _id = 2
db.products.updateOne(
  {
    _id: 2,
  },
  {
    $set: {
      category: "food",
    },
  }
);

// updateMany()
// UPDATE products SET tags = ["food"] WHERE category = "food" AND tags IS NULL
db.products.updateMany(
  {
    category: {
      $eq: "food",
    },
    tags: {
      $exists: false,
    },
  },
  {
    $set: {
      tags: ["food"],
    },
  }
);

// replaceOne()
db.products.insertOne({
  _id: 9,
  name: "ups salah",
  wrong: "salah lagi",
});

db.products.replaceOne(
  {
    _id: 9,
  },
  {
    name: "Adidas Samba",
    price: new NumberLong("1700000"),
    category: "shoes",
    tags: ["adidas", "shoes", "running"],
  }
);

// Field Update Operator
// $set            // Mengubah nilai field di document
// $unset          // Menghapus field di document
// $rename         // Mengubah nama field di document
// $inc            // Menaikan nilai number di field sesuai dengan jumlah tertentu
// $currentDate    // Mengubah field menjadi waktu saat ini

// $set operator
db.products.updateMany(
  {},
  {
    $set: {
      stok: 0,
    },
  }
);

// $inc operator
// UPDATE products SET stok = stok + 10
db.products.updateMany(
  {},
  {
    $inc: {
      stok: 10,
    },
  }
);

// $rename operator
// ALTER TABLE customer CHANGE name full_name
db.customers.updateMany(
  {},
  {
    $rename: {
      name: "full_name",
    },
  }
);
db.customers.updateMany(
  {},
  {
    $rename: {
      full_name: "name",
    },
  }
);

// $unset operator
// UPDATE customers set wrong = 'ups'
db.customers.updateMany(
  {},
  {
    $set: {
      wrong: "ups",
    },
  }
);
// ALTER TABLE customers DROP COLUMN  wrong
db.customers.updateMany(
  {},
  {
    $unset: {
      wrong: "",
    },
  }
);

// $currentDate
// UPDATE product SET lastModifiedDate = current_date()
db.products.updateMany(
  {},
  {
    $currentDate: {
      lastModifiedDate: {
        $type: "date",
      },
    },
  }
);

// Array Update Operator
// $                   // Mengupdate data array pertama sesuai kondisi query
// $[]                 // Mengupdate semua data array sesuai kondisi query
// $[<identifier>]     // </identifier> Mengupdate semua data array yang sesuai kondisi arrayFilters
// <index>             // Mengupdate data array sesuai dengan nomor index
// $addToset           // Menambahkan value ke array, dihiraukan jika sudah ada
// $pop                // Menghapus element pertama (-1) atau terakhir (1) array
// $pull               // Menghapus semua element di array yang sesuai kondisi
// $push               // Menambahkan element ke array
// $pullAll            // Menghapus semua element di array

// $    operator
// UPDATE products SET ratings = [90, 80,70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);
// Update first array ratings
db.products.updateMany(
  {
    ratings: 90,
  },
  {
    $set: {
      "ratings.$": 100,
    },
  }
);

// $[]  operator
// update semua array
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[]": 100,
    },
  }
);

// $[<identifier>]  update semua element sesuai arrayFilters
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[element]": 100,
    },
  },
  {
    arrayFilters: [
      {
        element: {
          $gt: 80,
        },
      },
    ],
  }
);

// <index>  update array sesuai index
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.0": 50,
      "ratings.1": 70,
    },
  }
);

// $addToset
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $addToSet: {
      tags: "popular",
    },
  }
);

// $pop
// remove fisrt array
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $pop: {
      ratings: -1,
    },
  }
);
// remove last array
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $pop: {
      ratings: 1,
    },
  }
);

// $pull remove ratings >= 80
db.products.updateMany(
  {},
  {
    $pull: {
      ratings: {
        $gt: 80,
      },
    },
  }
);

// $push
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 100,
    },
  }
);
// $pullAll remove element 100
db.products.updateMany(
  {},
  {
    $pullAll: {
      ratings: [100],
    },
  }
);

// Array Update Operator Modifier

// $each Digunakan di $addToSet dan $push, untuk menambahkan multiple element
// add trending, popular
db.products.updateMany(
  {},
  {
    $addToSet: {
      tags: {
        $each: ["trending", "popular"],
      },
    },
  }
);

// $position Digunakan di $push untuk mengubah posisi menambahkan data
// add hot position 1
db.products.updateMany(
  {},
  {
    $push: {
      tags: {
        $each: ["hot"],
        $position: 1,
      },
    },
  }
);

// $slice Digunakan di $push untuk menentukan jumlah maksimal data array
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [10, 20, 30],
        $slice: -3,
      },
    },
  }
);

// $sort Digunakan untuk mengurutkan array setelah operasi $push
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [50, 40, 30],
        $sort: -1,
      },
    },
  }
);

// Delete Document

// db.<collection>.deleteOne(query) Menghapus satu document yang sesuai dengan kondisi query
db.customers.insertOne({
  _id: "spammer",
  name: "spam",
});

db.customers.deleteOne({
  _id: "spammer",
});

// db.<collection>.deleteMany(query) Menghapus banyak document yang sesuai dengan kondisi query
db.customers.insertMany([
  {
    _id: "spammer1",
    name: "spammer1",
  },
  {
    _id: "spammer2",
    name: "spammer2",
  },
  {
    _id: "spammer3",
    name: "spammer3",
  },
]);

db.customers.deleteMany({
  _id: {
    $regex: "spammer",
  },
});

// Bulk Write Operations
db.customers.bulkWrite([
  {
    insertOne: {
      document: {
        _id: "rizal",
        name: "rizal",
      },
    },
  },
  {
    insertOne: {
      document: {
        _id: "nawang",
        name: "nawang",
      },
    },
  },
  {
    updateMany: {
      filter: {
        _id: {
          $in: ["rizal", "nawang"],
        },
      },
      update: {
        $set: {
          name: "Rizal Nawang Pradanaaa",
        },
      },
    },
  },
]);

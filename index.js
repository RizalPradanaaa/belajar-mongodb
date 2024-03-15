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

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

// db.createCollection("customers")  // Membuat collection customers
// db.createCollection("products")   // Membuat collection products
// db.createCollection("orders")     // Membuat collection orders

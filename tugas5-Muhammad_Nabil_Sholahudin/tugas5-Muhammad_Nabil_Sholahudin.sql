--SOAL 1

CREATE DATABASE book_store;

CREATE TABLE books(
    Id_Buku INT PRIMARY KEY NOT NULL,
    Judul_Buku VARCHAR,
    Pengarang VARCHAR,
    Tahun_Terbit YEAR,
    Penerbit VARCHAR,
    Tanggal_Dibuat DATE,
    Tanggal_Diupdate DATE
);

CREATE TABLE category(
    Id_Category INT PRIMARY KEY NOT NULL,
    Nama_Category VARCHAR,
    Tanggal_Dibuat DATE,
    Tanggal_Diupdate DATE
);

--SOAL 2

INSERT INTO books VALUES (
    1, "Building Microservices","Sam Newman",2014, "O'Reilly Media","18-09-2023", "18-09-2023"
),(
    2, "Clean Code", "Robert C.Martin", 2008, "Prentice Hall", "18-09-2023", "18-09-2023"
),(
    3, "The Pragmatic Programmer", "Andrew Hunt", 1999, "Addison-Wesley", "18-09-2023", "18-09-2023"
),(
    4, "Design Patterns", "Erich Gamma", 1994, "Addison-Wesley", "18-09-2023", "18-09-2023"    
),(
    5, "Introduction to Algorithms", "Thomas H.Cormen", 1990, "MIT Press", "18-09-2023", "18-09-2023"    
),(
    6, "The Art of Computer Prog.", "Donald E.Knuth", 1968, "Addison-Wesley", "18-09-2023", "18-09-2023"    
),(
    7, "Clean Architecture", "Robert C.Martin", 2017, "Prentice Hall", "18-09-2023", "18-09-2023"   
),(
    8, "Refactoring", "Martin Fowler", 1999, "Addison-Wesley", "18-09-2023", "18-09-2023"   
),(
    9, "Domain-Driven Design", "Eric Evans", 2003, "Addison-Wesley", "18-09-2023", "18-09-2023"   
),(
    10, "The Mythical Man-Month", "Frederick Brooks", 1975, "Addison-Wesley", "18-09-2023", "18-09-2023"   
); 

INSERT INTO category VALUES (
    1, "Pemrograman",  "18-09-2023", "18-09-2023" 
),(
    2, "Fiksi",  "18-09-2023", "18-09-2023" 
),(
    3, "Nonfiksi",  "18-09-2023", "18-09-2023" 
),(
    4, "Bisnis",  "18-09-2023", "18-09-2023" 
),(
    5, "Teknologi",  "18-09-2023", "18-09-2023" 
),(
    6, "Seni",  "18-09-2023", "18-09-2023" 
),(
    7, "Sejarah",  "18-09-2023", "18-09-2023" 
),(
    8, "Sains",  "18-09-2023", "18-09-2023" 
),(
    9, "Hukum",  "18-09-2023", "18-09-2023" 
),(
    10, "Kesehatan",  "18-09-2023", "18-09-2023" 
);

--SOAL 3

SELECT * FROM books;

SELECT * FROM category;

--SOAL 4

UPDATE books SET Judul_Buku = "Building Microservices: Designing FineGrained Systems 1st", Tahun_Terbit = 2015, Tanggal_Diupdate = "20-09-2023" WHERE Id_Buku = 1;

--SOAL 5

DELETE FROM books WHERE Id_Buku = 10;

DELETE FROM category WHERE Id_Category = 10;

--SOAL 6

SELECT Judul_Buku FROM books WHERE Penerbit = "Addison-Wesley";

SELECT * FROM books WHERE Tahun_Terbit BETWEEN 2003 AND 2023;

SELECT * FROM books WHERE judul_buku LIKE "%design%";

--SOAL 7

CREATE TABLE book_categories (
    Id INT PRIMARY KEY NOT NULL,
    Id_Category INT NOT NULL,
    Id_Buku INT NOT NULL,
    Tanggal_Dibuat VARCHAR,
    Tanggal_Diupdate VARCHAR,
  	FOREIGN KEY (Id_Category) REFERENCES category(Id_Category),
 	FOREIGN KEY (Id_Buku) REFERENCES books(Id_Buku)
);

--SOAL 8

INSERT INTO book_categories VALUES (
    1, 1, 2, "18-09-2023", "18-09-2023"
),(
    2, 5, 3, "18-09-2023", "18-09-2023"
),(
    3, 1, 1, "18-09-2023", "18-09-2023"
);

--SOAL 9

SELECT book_categories.Id, books.Judul_Buku, category.Nama_Category 
FROM books 
INNER JOIN book_categories ON  books.Id_Buku = book_categories.Id_Buku 
INNER JOIN category ON category.Id_Category = book_categories.Id_Category;

--SOAL 10

ALTER TABLE books ADD COLUMN Jumlah_Halaman NUMBER;





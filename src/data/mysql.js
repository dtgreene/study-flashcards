export default [
  {
    front: 'Adding columns with alter table',
    back: `~~~sql
ALTER TABLE Movie
ADD COLUMN Producer VARCHAR(50);
~~~`,
    back_link: 'https://www.w3schools.com/mysql/mysql_alter.asp',
  },
  {
    front: 'Dropping columns',
    back: `~~~sql
ALTER TABLE Movie
DROP COLUMN Genre;
~~~`,
    back_link: 'https://www.w3schools.com/SQl/sql_ref_drop_column.asp',
  },
  {
    front: 'Renaming columns',
    back: `~~~sql
ALTER TABLE Movie
RENAME COLUMN Year TO ReleaseYear;
~~~`,
    back_link: 'https://www.w3schools.com/sql/sql_alter.asp',
  },
  {
    front: 'Updating column data types',
    back: `~~~sql
ALTER TABLE Movie
MODIFY COLUMN ReleaseYear SMALLINT;
~~~`,
    back_link: 'https://www.w3schools.com/mysql/mysql_alter.asp',
  },
  {
    front: 'Inserting rows',
    back: `~~~sql
INSERT INTO Horse
    (RegisteredName, Breed, Height, BirthDate)
VALUES
  ("Babe", "Quarter Horse", 15.3, "2015-02-10"),
  ("Independence", "Holsteiner", 16.0, "2016-03-13");
~~~`,
    back_link: 'https://www.w3schools.com/mysql/mysql_insert.asp',
  },
  {
    front: 'Updating rows',
    back: `~~~sql
UPDATE Horse
SET RegisteredName = "Lady Luck", BirthDate = "2015-05-01"
WHERE ID = 4;
~~~`,
    back_link: 'https://www.w3schools.com/mysql/mysql_update.asp',
  },
  {
    front: 'Deleting rows',
    back: `~~~sql
DELETE FROM Horse
WHERE BirthDate < "2013-03-13";
~~~`,
    back_link: 'https://www.w3schools.com/mysql/mysql_delete.asp',
  },
  {
    front: 'INT (signed) max value',
    back: `2,147,483,647  
4 bytes`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/integer-types.html',
  },
  {
    front: 'MEDIUMINT (signed) max value',
    back: ['8,388,607', '3 bytes'],
    back: `8,388,607  
3 bytes`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/integer-types.html',
  },
  {
    front: 'SMALLINT (signed) max value',
    back: `32,767  
2 bytes`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/integer-types.html',
  },
  {
    front: 'TINYINT (signed) max value',
    back: `127  
1 byte`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/integer-types.html',
  },
  {
    front: 'Adding foreign keys during table creation',
    back: `~~~sql
CREATE TABLE Horse (
  HorseID SMALLINT UNSIGNED NOT NULL,
  FOREIGN KEY (HorseID) REFERENCES Horse(ID)
);
~~~`,
    back_link:
      'https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html',
  },
  {
    front: 'Adding foreign keys with alter table',
    back: `~~~sql
ALTER TABLE Horse
ADD CONSTRAINT FOREIGN KEY (HorseID) REFERENCES Horse(ID);
~~~`,
    back_link:
      'https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html',
  },
  {
    front: 'Foreign key with referential action',
    back: `~~~sql
CREATE TABLE Horse (
  HorseID SMALLINT UNSIGNED NOT NULL,
  FOREIGN KEY (HorseID) REFERENCES Horse(ID) ON DELETE RESTRICT
);
~~~`,
    back_link:
      'https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html',
  },
  {
    front: 'Referential actions',
    back: `
* RESTRICT
* SET NULL
* SET DEFAULT
* CASCADE`,
    back_link:
      'https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html',
  },
  {
    front: 'Using savepoints',
    back: `~~~sql
START TRANSACTION;
-- Do some work
SAVEPOINT MySavePoint;
-- Do some other work
ROLLBACK TO SAVEPOINT MySavePoint;
COMMIT;
~~~`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/savepoint.html',
  },
  {
    front: 'Creating and dropping views',
    back: `~~~sql
-- Create
CREATE VIEW MyMovieView
AS SELECT * FROM Movie;

-- Drop
DROP VIEW MyMovieView;
~~~`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/create-view.html',
  },
  {
    front: 'Creating indices',
    back: `~~~sql
CREATE INDEX MyYearIndex ON Movie(Year);
~~~`,
    back_link: 'https://dev.mysql.com/doc/refman/8.4/en/create-index.html',
  },
  {
    front: 'Selecting unique columns',
    back: `~~~sql
SELECT DISTINCT(RatingCode)
FROM Movie
ORDER BY RatingCode ASC;
~~~`,
    back_link: 'https://www.w3schools.com/sql/sql_distinct.asp',
  },
];

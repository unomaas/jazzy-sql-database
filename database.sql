-- [x] Write the SQL to create both of the tables (Note: Make sure to use the table names shown.)
CREATE TABLE "artist" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "birthdate" DATE
);

-- [x] Write the SQL to create both of the tables (Note: Make sure to use the table names shown.)
CREATE TABLE "song" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(80) NOT NULL,
	"length" VARCHAR(10),
	"released" DATE
);

-- [x] Write INSERT statements to add the sample data provided in the `server.js` file. 
INSERT INTO "artist" ("name", "birthdate")
VALUES ('Ella Fitzgerald', '04-25-1917'), ('Dave Brubeck', '12-06-1920'), ('Miles Davis', '05-26-1926'), ('Esperanza Spalding', '10-18-1984');

-- [x] Write INSERT statements to add the sample data provided in the `server.js` file. 
INSERT INTO "song" ("title", "length", "released")
VALUES ('Take Five', '5:24', '1959-09-29'), ('So What', '9:22', '1959-08-17'), ('Black Gold', '5:17', '2012-02-01');

-- [x] Update the `\artist` GET route to get data from the database. Sort the data by birthdate, youngest to oldest.
SELECT * FROM "artist" ORDER BY "birthdate" DESC;

-- [x] Update the `\song` GET route to get data from the database. Sort the data by title.
SELECT * FROM "song" ORDER BY "title" ASC;
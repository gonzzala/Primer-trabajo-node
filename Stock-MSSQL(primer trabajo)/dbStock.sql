USE master
GO

CREATE DATABASE STOCK 
    ON (NAME = N'File_Stock', FILENAME = N'D:\DATABASE\DB_Stock.mdf', SIZE = 10MB, FILEGROWTH = 10%)
LOG ON (NAME = N'Log_Stock', FILENAME = N'D:\DATABASE\LOG_Stock.ldf', SIZE = 5MB, FILEGROWTH = 5%)
GO

USE STOCK
GO

CREATE TABLE categories (
idcategory TINYINT IDENTITY(1,1),
description VARCHAR(100) NOT NULL,
created_at DATETIME NOT NULL DEFAULT GETDATE(),
updated_at DATETIME NOT NULL DEFAULT GETDATE(),
enabled BIT DEFAULT 1,
PRIMARY KEY (idcategory))
GO

INSERT INTO categories (description) VALUES('Supermercado'), ('Electrónicos'),('Indumentaria'),
('Salud'),('Computación'), ('Celulares y Telefonía')
GO

CREATE TABLE products (
idproduct INT IDENTITY(1,1) PRIMARY KEY,
idcategory TINYINT NOT NULL,
denomination VARCHAR(50) NOT NULL,
additional_info VARCHAR(100) NULL,
price DECIMAL(8, 2) NOT NULL,
stock INT NOT NULL DEFAULT 0,
created_at DATETIME NOT NULL DEFAULT GETDATE(),
updated_at DATETIME NOT NULL DEFAULT GETDATE(),
enabled BIT NOT NULL DEFAULT 1,
CONSTRAINT rl_products_categories 
FOREIGN KEY (idcategory) REFERENCES categories (idcategory)
ON DELETE CASCADE)
GO

INSERT INTO products (idcategory, denomination, price, stock) VALUES (2, 'Proyector Digital 3200', 50000, 15)
INSERT INTO products (idcategory, denomination, price, stock) VALUES (3, 'Campera Jean', 10000, 40)
INSERT INTO products (idcategory, denomination, price, stock) VALUES (4, 'Tensiométro', 5500.50, 10)
INSERT INTO products (idcategory, denomination, price, stock) VALUES (5, 'Notebook 14"', 120000, 4)
INSERT INTO products (idcategory, denomination, price, stock) VALUES (6, 'Telefóno Android 10.0', 85000, 10)
GO

CREATE TABLE movements (
idmovement INT IDENTITY(1,1) PRIMARY KEY,
idproduct INT NOT NULL,
quantity INT NOT NULL,
observations VARCHAR(255) NULL,
created_at DATETIME NOT NULL DEFAULT GETDATE(),
updated_at DATETIME NOT NULL DEFAULT GETDATE(),
CONSTRAINT rl_movements_products 
FOREIGN KEY (idproduct) REFERENCES products (idproduct)
ON DELETE CASCADE)
GO

CREATE TABLE users (
id TINYINT IDENTITY(1,1) PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
email_verified_at DATETIME NULL,
password VARBINARY(100) NOT NULL,
isadmin BIT NOT NULL DEFAULT 0,
created_at DATETIME NOT NULL DEFAULT GETDATE(),
updated_at DATETIME NOT NULL DEFAULT GETDATE())
GO
            
CREATE VIEW vwGetProducts
AS
SELECT P.idproduct, C.idcategory, C.description, P.denomination, P.additional_info,
P.price, P.stock, P.enabled FROM categories C INNER JOIN products P ON P.idcategory = C.idcategory
GO

CREATE PROCEDURE spCreateProduct
@idcategory TINYINT,
@denomination VARCHAR(50),
@additional_info VARCHAR(100) = NULL,
@price DECIMAL(8, 2),
@stock INT = 0,
@idproduct INT OUTPUT
AS
BEGIN
INSERT INTO products (idcategory, denomination, additional_info, price, stock) 
VALUES (@idcategory, @denomination, @additional_info, @price, @stock)
SELECT @idproduct = SCOPE_IDENTITY()
END
GO

DECLARE @id INT
EXEC spCreateProduct 5, 'TEST', '', 100.10, 5, @id OUTPUT
SELECT @id

CREATE PROCEDURE spCreateMovement
@idproduct INT,
@quantity INT,
@observations VARCHAR(255) = NULL,
@stock INT OUTPUT
AS
BEGIN
SELECT @stock = stock FROM products WHERE idproduct = @idproduct
IF @stock + @quantity >= 0
   BEGIN
	   INSERT INTO movements (idproduct, quantity, observations) 
	   VALUES (@idproduct, @quantity, @observations)
	   SET @stock = @stock + @quantity
	   UPDATE products SET stock = @stock WHERE idproduct = @idproduct
   END
ELSE
	BEGIN
		RAISERROR ('Stock insuficiente', 16, 1)
	END   
END
GO

DECLARE @stock INT
EXEC spCreateMovement 1, -215, '', @stock OUTPUT
SELECT @stock AS stock

SELECT * FROM products WHERE idproduct = 1
SELECT * FROM movements WHERE idproduct = 1

CREATE PROCEDURE sp_login
  @email VARCHAR(50),
  @password VARCHAR(50)
AS
BEGIN
	DECLARE @value INT, @isadmin BIT, @name VARCHAR(50), @id INT
	SET @value = (SELECT COUNT(id) AS count FROM users WHERE email=@email AND PWDCOMPARE(@password, password)=1)
	IF @value=1
	BEGIN
		SELECT @id = id, @isadmin = isadmin, @name = name FROM users WHERE email=@email AND PWDCOMPARE(@password, password)=1
	END
	ELSE
	BEGIN
		SET @id = NULL
		SET @email = NULL
		SET @name = NULL
		SET @isadmin = NULL
	END
	SELECT @id AS id, @email AS email, ISNULL(@name, '') AS name
END	
GO     

INSERT INTO users (name, email, password) VALUES ('test', 'test@mail.com', PWDENCRYPT('1234'))
GO

sp_login 'test@mail.com', '1234'
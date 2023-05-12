create PROCEDURE spCreatecategorie
@description VARCHAR(100),
@enabled bit 
AS
BEGIN
INSERT INTO categories (description,enabled)
VALUES (@description, @enabled)
END
GO

create VIEW vwGetcategory
AS
select c.description, count(c.idcategory) AS cantidad from 
categories c inner join products p on c.idcategory = p.idcategory
group by c.description
GO

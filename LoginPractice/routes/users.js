var express = require("express");
var router = express.Router();
const sql = require("mssql");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const response = await sql.query`select * from Persons`;
  res.json(response.recordset);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const response =
    await sql.query`select * from Persons WHERE PersonID = ${id}`;
  res.json(response.recordset);
});

router.post("/", async function (req, res, next) {
  //console.log(req.body);
  const { Name, Password, Age, Genre } = req.body;
  const response =
    await sql.query`INSERT INTO [dbo].[Persons] ([Name],[Password],[Age],[Genre])
    OUTPUT inserted.*
    VALUES (${Name},${Password} ,${Age},${Genre})`;
  res.json(response.recordset);
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { Name, Age, Genre } = req.body;
  await sql.query`UPDATE [dbo].[Persons] 
    SET [Name] = ${Name}, [Age] = ${Age}, [Genre] = ${Genre} 
    WHERE PersonID = ${id}`;
  res.send("updated data");
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  await sql.query`DELETE from Persons WHERE PersonID = ${id}`;
  res.send("deleted data");
});

module.exports = router;

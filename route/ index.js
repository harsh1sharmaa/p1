const express = require("express");
const router = express.Router();
// GET home page.
router.get("/",   (req, res)=> {
  req.app.locals.dbObj.then(async (db)=> {

    console.log(db)
    const files = await db.collection('products').find({}).toArray()
    console.log(files)
    res.json({ files })
  })
// res.send(conn);
});
router.get("/dsfd", function (req, res) {
    res.redirect("/catalog");
  });

module.exports = router;
  
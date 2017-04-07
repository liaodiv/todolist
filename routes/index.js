var express = require('express');
var router = express.Router();
var File = require('./datareader');   ///FILE管理所有的文件存储
var file = new File();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
    console.log(file.data)
});

router.get('/getdata',function (req,res,next) {
  console.log("已接受");
  res.json(file.data)
})

router.delete('/delete/:id',function (req,res) {
    console.log(req.params.id)
    var index=req.params.id;
    file.data.splice(index,1)
    file.writedata()
})

router.put('/put/:id',function (req,res) {

    var index=req.params.id;
    var complete = req.query.complete;
    file.data[index].complete = complete;
    file.writedata()
})

router.post('/getdata',function (req,res) {
     var Item=req.body;
    file.data[file.data.length] = Item;
    res.send({result:'OK'})
    console.log(file.data)
    file.writedata()
})


module.exports = router;

/**
 * Created by 27353 on 2017/4/6.
 */
var fs=require('fs');

var file="./data.json";


/*fs.readFile(file,'utf-8',function (err,data) {
    if(err){
        console.error(err)
    }else {
        data= JSON.parse(data);
        console.log(data[0]);
    }
});*/
class read{
    constructor(){
        this.readata(this.data)
    }
    readata(data){
        fs.readFile(file,'utf-8',(err,data)=> {
            if(err){
                console.error(err)
            }else {
                data=JSON.parse(data);
                this.data = data;
                console.log(this.data)
            }
        })

    }
    writedata(){
        var json= JSON.stringify(this.data)
        fs.writeFile(file,json,function (err) {
            if(err){
                console.log(err)
            }
        })
    }

}
//var a = new read();



module.exports = read;
//console.log(result);
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.listen(3000,function(){
    console.log('App listening on port 3000!');
});

app.get('/:id',function(req,res){
    fs.stat(req.params.id,function(err,stats){
        if (err === null){
            fs.readFile(req.params.id, "utf8",
                function(error,data){
                    if(error) throw error;
                    res.send(data);
                });
            }
        else{
            res.send('file not found');
        }
        })
    });

app.post('/:id',function(req,res){
    fs.writeFile(req.params.id, req.body, function(error){
        if(error) throw error; // если возникла ошибка
        res.sendStatus(200);
    });
});

app.put('/:id',function(req,res) {
    fs.stat(req.params.id, function(err,stats){
        if (err === null){
            fs.appendFile(req.params.id, req._body, function (error) {
                if (error) throw error; // если возникла ошибка
                res.sendStatus(200);
            });
        }
        else {
            res.send('file not found');
        }
    })

});

app.delete('/:id',function(req,res){
    fs.stat(req.params.id, function(err,stats){
        if (err === null){
            fs.unlink(req.params.id,function (error) {
                if (error) throw error;
                res.sendStatus(200);
            });
        }
        else {
            res.send('file not found');
        }
    })
});
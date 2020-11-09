const express = require('express')
const cors=require('cors')
const iusers=require('./users.json')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs');
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let iusers1=require('./users.json')
var posts=[];
function save(){
jsonString=JSON.stringify(iusers1)
  fs.writeFile('users.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
}
app.get('/',(req,res)=>{
  res.json({...iusers1})
})
app.get('/getuser/:moboremail', (req, res) => {
    iusers1.forEach(u=>{
      u.forEach(user=>{
        if((user.moboremail==req.params.moboremail || user.uname==req.params.moboremail || (user.email==req.params.moboremail ))){
          res.json({...user,status:"true"})
        }
      }) 
    })
  res.json({status:"false"});
})
app.get('/getpost',(req,res)=>{
  res.json({...iusers1})
})
app.post('/saveuser',(req,res)=>{
  response = {  
    users:req.body  
};  
iusers1.push(req.body)
console.log(iusers1)
console.log(response); 
save()
res.end(JSON.stringify(response));  
})
app.post('/savecomment/:email',(req,res)=>{
  console.log(req.body);
  response = {  
    users:req.body  
};
iusers1.forEach(u=>{
  u.forEach(user=>{
    if((user.moboremail==req.params.email || user.uname==req.params.email || (user.email==req.params.email ))){
      user.posts=req.body
    }
  }) 
})
save()
res.end(JSON.stringify(response));  
})
app.post('/changepoto/:email',(req,res)=>{
  response = {  
    users:req.body  
};  
var newurl;
req.body.forEach(k=>{
  newurl=k.url
})
iusers1.forEach(u=>{
  u.forEach(user=>{
    if((user.moboremail==req.params.email || user.uname==req.params.email || (user.email==req.params.email ))){
      user.profile=newurl
    }
  }) 
})
// console.log(iusers1); 
save()
res.end(JSON.stringify(response));  
})
app.post('/changepass/:email',(req,res)=>{
  response = {  
    users:req.body  
};
iusers1.forEach(u=>{
  u.forEach(user=>{
    if((user.moboremail==req.params.email || user.uname==req.params.email || (user.email==req.params.email ))){
      req.body.forEach(k=>{
        user.pass= k.pass
      })
    }
  }) 
})
save()
res.end(JSON.stringify(response));  
})
app.post('/like/:email',(req,res)=>{
  response = {  
    users:req.body  
};
iusers1.forEach(u=>{
  u.forEach(user=>{
    if((user.moboremail==req.params.email || user.uname==req.params.email || (user.email==req.params.email ))){
      req.body.forEach(k=>{
        user.posts.forEach(post=>{
          if(k.id==post.id){
            post.likes=k.likes
          }
        })
      })
    }
  }) 
})
save()
res.end(JSON.stringify(response));  
})
app.post('/edit/:email',(req,res)=>{
  response = {  
    users:req.body  
};  
iusers1.forEach(u=>{
  u.forEach(user=>{
    if((user.moboremail==req.params.email || user.uname==req.params.email || (user.email==req.params.email ))){
      req.body.forEach(k=>{
        user.fname= k.fname,
        user.uname= k.uname,
        user.phone= k.phone,
        user.email= k.email,
        user.website= k.website,
        user.bio= k.bio,
        user.gender= k.gender
      })
    }
  }) 
})
save()
res.end(JSON.stringify(response));  
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
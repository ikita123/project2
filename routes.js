
const express=require("express");
const router= express.Router()
const db =require('../config/db.js')
const app=express();
const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "Nikita@12345",
      database: "merakilearn",
    },
});
router.get('/',(req,res)=>{
    knex.from("courseDetails").select("*")
    .then((col)=>{
        res.send(col)
    })
})
router.get('/:id',(req,res)=>{
    const{id}=req.params;
    knex.schema.hasTable("courseDetails").then(function(exists){
        if(exists){
            return knex.from("courseDetails").select("*").where("id",id).then(function(ans){
                if(ans!=0){res.send(ans)}
                else(res.status(500).send("id is not dound"))
            })
        }
    })
})
router.post('/',(req,res)=>{
    var user_1=req.body
    console.log(user_1);
    knex.schema.hasTable("courseDetails").then(function (exists) {
        if (exists) {
          res.send({ Success: `data inserted into users table.` });
          return knex("courseDetails").insert({id:user_1.id,name:user_1.name,logo:user_1.logo,notes:user_1.logo,days_to_complete:user_1.days_to_complete,short_description:user_1.short_description,type:user_1.type,lang_available:user_1.lang_available.toString()}
          );
        }
      });
    })    
router.put("/:id",(req,res)=>{
    const id = req.params.id
    var name=req.body.name
    var logo=req.body.logo
    var notes=req.body.notes
    var days_to_complete=req.body.days_to_complete
    var short_description=req.body.short_description
    var type=req.body.type
    var lang_available=req.body.lang_available
    knex.schema.hasTable("courseDetails").then(function (exists) {
        const user_1=req.body;
        if (exists) {
          res.send({ Success: `data updated into users table.` });
          return knex("courseDetails").update({name:user_1.name,logo:user_1.logo,notes:user_1.notes,days_to_complete:user_1.days_to_complete,short_description:user_1.short_description,type:user_1.type,lang_available:user_1.lang_available.toString()})
            .where("id",id)}
        })
})
router.delete("/:id",(req,res)=>{
    const{id}=req.params
    knex.schema.hasTable("courseDetails").then(function(exists){
        if(exists){
            res.send({ Success: `data is deleted by id:${id} successfully.` });
            return knex("courseDetails").select("*").where("id",id).del();
        }
})
})
module.exports=router

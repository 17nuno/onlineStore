const express = require("express");
const cors = require("cors");
const bcrypt=require("bcrypt");
const app = express();
const pool = require("../db/db");

const http=require("http");
const {Server} = require("socket.io");


app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});



//socket io
io.on("connection", (socket) => {
    console.log("entra no socket");
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })
})




//database requests
app.post("/signup", async (req, res) => {
    try{
        const {firstName, lastName, username, password} = req.body;
        //const hashedPassword = await bcrypt.hash(password, 10);
        
        const createUser = await pool.query("insert into users (firstname, lastname, username, password) VALUES ($1,$2,$3,$4)", [firstName, lastName, username, password]);

        res.json({firstName, lastName, username, password})
    } catch(error){
        console.log(error);
        res.json(error)
    }
});

app.post("/login", async (req, res) => {
    console.log('req.')
    console.log(req.body)
    try{
        const {username, password} = req.body;        
        //console.log(username, password)
        //const hashedPassword = await bcrypt.hash(password, 10);
        //const getUser = await pool.query("insert into users (firstname, lastname, username, password) VALUES ($1,$2,$3,$4)", [firstName, lastName, username, hashedPassword]);
        const getUser = await pool.query("select * from users where username=$1 and password=$2", [username, password]);
       
        if(getUser){
            if(getUser.rowCount>0){
                //console.log("getUser", getUser.rowCount);
                //res.json({firstName, lastName, username});
                res.json({username});
            }
            else{
                res.json({});
            }
        }
        else{
            //console.log("nao fez o select")
            res.json({});
        }
        
    } catch(error){
        //console.log(error);
        res.json(error)
    }
})



// app.get("/todos", async (req, res) => {
//     try {
//       const allTodos = await pool.query("SELECT * FROM todo");
//       res.json(allTodos.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });



server.listen(3001, () => {
    console.log("Server is running on port 3001");
})
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';


// Need when using type="module" 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const PORT = 5001

const app = express();

app.use(express.json());

let data = 'Initial Data';

const waitingClients = [];

app.get('/',(req,res)=>{
    
    res.sendFile(__dirname + '/index.html');
})

app.get('/getData', (req, res) => {
    if (data !== req.query.lastData) {
      res.json({ data });
    } else {
      waitingClients.push(res);
    }
  });
  
  // Use post/put to update
  app.get('/updateData', (req, res) => {
    data = req.query.data;
  
    while(waitingClients.length > 0) {
      const client = waitingClients.pop();
      client.json({ data });
    }
  
    res.send({ success: 'Data updated successfully'})
  })


app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})

console.log("hello")
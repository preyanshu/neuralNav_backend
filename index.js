
const express=require("express")
var cors = require('cors')

const spawner=require("child_process").spawn;
const app=express()
const port=5000; 


app.use(cors())
app.use(express.json())

app.post('/api', function (req, res) {
    console.log(req.body);

    const data_to_pass_in = req.body.message;
    console.log(data_to_pass_in);
  

    const python_process=spawner("python",["python.py",(data_to_pass_in)]);
python_process.stdout.on("data",(data) =>{
    
    console.log(data.toString());
   
    var obj= {
        value : data.toString()

    }

    res.json("hi");


    

});
    


});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
    
    
});

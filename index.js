
const express=require("express")
var cors = require('cors')
require("dotenv").config()

// const spawner=require("child_process").spawn;
const app=express()
const port=5000; 
const { Configuration, OpenAIApi } = require("openai");


app.use(cors())
app.use(express.json())

app.post('/api', async function (req, res) {
    try {
        console.log(req.body);

    const data_to_pass_in = req.body.message;
    console.log(data_to_pass_in);
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);

    
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "assistant", "content": "You are a helpful assistant."}, {role: "user", content:data_to_pass_in }],
          });
          console.log("working");
          res.json({value:completion.data.choices[0].message.content})

        
    } catch (error) {
        // console.log(completion.data.choices[0].message)
        console.error(error
            );
        res.json({value:error.message+":  token expired"})
        
    }
    

   

      
      
  

   
    


});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
    
    
});
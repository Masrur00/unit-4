const app = require('./index');

const connect = require('./config/db');

app.listen(5000, async ()=>{
    try {
        await connect();   
        console.log('server is running on port 5000');
    } catch (error) {
        console.log({"message " :error});
    }    
})
const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, async ()=>{
    try {
        await connect();
        console.log('Port is running on 5000');
    } catch (error) {
        console.log(error.message);
    }
})


/*

const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, async function () {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.error(err.message);
  }
});

*/
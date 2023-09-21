const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world!');
});
app.post("/hook", (req, res) => {
    console.log("hook")
    res.sendStatus(200);
})
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
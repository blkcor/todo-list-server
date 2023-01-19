const express = require('express')
const app = express()
const PORT = 8080
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let todoItems = [
  { id: 0, value: "React", done: false, delete: false }
]

// 省略了未修改的代码

app.all('*', function (req, res, next) {
  // 允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许跨域的请求头
  res.header('Access-Control-Allow-Headers', 'content-type');
  // 允许跨域的请求方法
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  next();
})

app.get('/items', function (req, res) {
  res.send(todoItems);
});


app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/items", (req, res) => {
  res.send(todoItems)
})

app.post("/items", (req, res) => {
  if (req.body.todoItem) {
    todoItems = [...todoItems, req.body.todoItem]
  }
  res.send(todoItems)
})

app.delete("/items", (req, res) => {
  if (req.body.id !== undefined) {
    //logical delete
    todoItems.forEach(item => {
      if (item.id === req.body.id) {
        item.delete = true
      }
    })
  }
  res.send(todoItems)
})

app.listen(PORT, () => {
  console.log(`the server is running on http://127.0.0.1:${PORT}`);
})


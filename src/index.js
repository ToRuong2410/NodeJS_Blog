const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')
// Connect to DB
db.connect()

// Kiểm tra các đường link trong phần static cung cấp -> để hiện thị
app.use(express.static(path.join(__dirname, 'public')))

// Middleware này giúp Express hiểu được dữ liệu được gửi từ form thông
// qua phương thức POST, PUT và PATCH.
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())
// XML HTTP Request, fetch, axios, ...

// HTTP logger
// app.use(morgan('combined'))

// Template engine
// -> tạo temlpate nhằm render ra giao diện trang web hoặc các phần tử người dùng
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// routes init: Khởi tạo
route(app)

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})

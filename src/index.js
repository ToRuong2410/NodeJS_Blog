const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
var cors = require('cors')

const route = require('./routes')
const db = require('./config/db')
// Connect to DB
db.connect()

// kích hoạt chính sách Same-Origin Policy - một cơ chế bảo mật trình duyệt web
// mà giới hạn các truy cập từ các trang web khác origin (gốc) để truy cập tài nguyên của một trang web.
app.use(cors())

// trỏ đến thư mục tĩnh
app.use(
  '/bootstrap/js',
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))
)
app.use(
  '/bootstrap/css',
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))
)

// Kiểm tra các đường link trong phần static cung cấp -> để hiển thị
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

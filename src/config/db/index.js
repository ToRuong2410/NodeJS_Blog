const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/f8_blog_dev')
    console.log('Connect thành công')
  } catch (error) {
    console.log('Lỗi connect')
  }
}

module.exports = { connect }

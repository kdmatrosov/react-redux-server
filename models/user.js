
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Определить модель
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// Создание класса модели
const ModelClass = mongoose.model('user', userSchema);

// Экспорт модели
module.exports = ModelClass;


const mongoose = require('mongoose');
const bcrypt  = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Определить модель
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// Хэш пароля
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
    {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err)
      {
        return next(err);
      }
      user.password = hash;
      next();

    });
  })
})
// Создание класса модели
const ModelClass = mongoose.model('user', userSchema);

// Экспорт модели
module.exports = ModelClass;

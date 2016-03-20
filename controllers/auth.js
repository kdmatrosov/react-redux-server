const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret); // у jwt есть свойство sub (subject)
}

exports.signup = function(req, res, next)
{
  // req.body - всё, что приходит в запросе
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
  {
    return res.status(422).send({error: 'Fill all fields'});
  }
  // Проверка "существует ли пользователь с таким email"
  User.findOne({email: email}, function(err, existingUser){
      if (err)
      {
        return next(err);
      }

      // Существует - Ошибка
      if (existingUser)
      {
        return res.status(422).send({error: 'Email is in use'});
      }
      // Не существует - Создание пользователя
      const user = new User({ // Создание пользователя
        email: email,
        password: password
      })
      user.save(function(err) {// Сохранение пользователя
          if (err)
          {
            return next(err);
          }
          // Ответ, что пользователь создан
          res.json({token: tokenForUser(user)});
      });

  });

}

const User = require('../models/user');

exports.signup = function(req, res, next)
{
  // req.body - всё, что приходит в запросе
  const email = req.body.email;
  const password = req.body.password;
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
      user.save(function(err) {
          if (err)
          {
            return next(err);
          }
          res.json(user);
      }); // Сохранение пользователя
      // Ответ, что пользователь создан
  });

}

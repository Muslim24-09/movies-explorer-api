const regExp = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';

const errorMessages = {
  nonAuth: 'Требуется авторизация',
  filmBadRequest: 'Введены некорректные данные при добавлении фильма',
  filmNotFound: 'Запрашиваемый фильм не найден',
  filmToDeleteAnotherUser: 'Вы не можете удалять чужие фильмы',
  filmDeletedFromSaved: 'Фильм был удален из сохраненных фильмов',
  filmBadRequestRemoval: 'Введены некорректные данные при удалении фильма',
  registerBadRequest: 'Неправильно набран логин или пароль',
  conflictEmail: 'Пользователь с таким email уже зарегистрирован',
  userNotFound: 'Запрашиваемый пользователь не найден',
  commonBadRequest: 'В поля введены некорректные значения',
  typeKeyInvalid: 'Ошибка в типе ключа',
  logOutSuccess: 'Успешнo разлогинились',
  serverError: 'На сервере произошла ошибка',
  urlIncorrect: 'Некорректный формат ссылки',
  emailIncorrect: 'Некорректный формат email',
  pageNotFound: 'Страница не найдена',
};

module.exports = {
  regExp,
  MONGO_URL,
  errorMessages,
};

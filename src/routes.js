const host = 'http://localhost:8080';

export default {
  usersPath: () => [host, 'users'].join('/'),
  contactsPath: (id) => [host, 'contacts', id].join('/'),
};

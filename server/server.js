// import jsonServer from 'json-server';
// import { promises as fsp } from 'fs';
// import path from 'path';

// const getDbData = async () => {
//   const dbData = await fsp.readFile(path.join(__dirname, 'db.json'), 'utf-8');
//   return dbData;
// };

// const server = jsonServer.create();
// // const router = jsonServer.router('./server/db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// // server.use(router);
// server.use(async (req, res) => {
//   console.log(req.data);
//   console.log(req.body);

//   const { login, password: currentPassword } = req.query;
//   const dbData = await getDbData();
//   const parsed = JSON.parse(dbData);
//   console.log(parsed);
//   const status = parsed.users[login] === currentPassword;
//   res.send({ loginStatus: status });
// });

// server.listen(8080, () => {
//   console.log('JSON Server is running on port 8080');
// });

import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'finals'
  }
];

const Users = [];

for (let i = 0; i < 1; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: "ubuntu10",
    addr: "8",
    'age|18-60': 1,
    birth: "86",
    ip: "192.168.14.1",
    sex: Mock.Random.integer(0, 1),
    component: 100,
  }));
}

export { LoginUsers, Users };

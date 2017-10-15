import Mock from 'mockjs';

const Hosts = [];

for (let i = 0; i < 24; i++) {
  Hosts.push(Mock.mock({
    id: Mock.Random.guid(),
    name: "ubunutu" + Mock.Random.integer(1, 100),
    cpu: Mock.Random.integer(4, 128),
    memory: Mock.Random.integer(8, 256),
    disk: Mock.Random.integer(2, 16),
    hip: Mock.Random.ip(),
    cmpt: Mock.Random.integer(16, 1024),
    desc: Mock.Random.cparagraph(2),
  }));
}

export { Hosts };
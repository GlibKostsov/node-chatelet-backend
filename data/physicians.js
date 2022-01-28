import bcrypt from 'bcryptjs'

const physicians = [
  {
    name: 'Sam Bolton',
    email: 'sam.bolton@clinique.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Marill Fry',
    email: 'marill.fry@clinique.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Marine Branch',
    email: 'marine.branch@clinique.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default physicians

// commonJS中，不能将import和module.exports混用，需用require和module.exports搭配使用
const { get } = require('js-cookie')
const tokens = {
  admin: {
    token: 'admin-token',
    password: 'admin123'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员'
  }
}

module.exports = [
  // user login
  {
    url: '/vue3-element-template/user/login',
    type: 'post',
    response: config => {
      const { userName, pwd } = config.body
      const token = tokens[userName]
      const password = tokens[userName]
      // mock error
      if (!token || !password || pwd !== password.password) {
        return {
          code: 60204,
          message: '账户名或密码错误'
        }
      }

      return {
        code: 20000,
        message: '登录成功',
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue3-element-template/user/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      console.log('config', config)
      console.log('token', token)
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue3-element-template/user/logout',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user roles
  {
    url: '/vue3-element-template/user/getRoles',
    type: 'get',
    response: () => {
      const token = get('vue3-element-template-token')
      const { roles } = users[token]
      return {
        code: 20000,
        data: roles,
        message: '获取成功'
      }
    }
  }
]

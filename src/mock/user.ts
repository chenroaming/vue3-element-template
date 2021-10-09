// commonJS中，不能将import和module.exports混用，需用require和module.exports搭配使用
import { get } from 'js-cookie'
interface config {
  body: any
  query: any
}
interface tokens {
  [userName:string]: any
}
interface users {
  [token:string]: any
}
interface res {
  code: number
  message?: string
  data?: string
}
const tokens = {
  // 用户名和密码
  admin: {
    token: 'admin-token',
    password: 'admin123'
  },
  editor: {
    token: 'editor-token',
    password: 'editor123'
  }
} as tokens

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am a editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '编辑者'
  }
} as users

const user:Array<any> = [
  // user login
  {
    url: '/vue3-element-template/user/login',
    type: 'post',
    response: (config:config):res => {
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
    response: (config:config):res => {
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
    response: ():res => {
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
    response: ():res => {
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

export default user

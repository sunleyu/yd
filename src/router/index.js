import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
// vue懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const Article = () => import('@/views/home/article')
const Question = () => import('@/views/question/index')
const Search = () => import('@/views/search/index')
const SearchResult = () => import('@/views/search/result')

const Video = () => import('@/views/video/index')

const User = () => import('@/views/user/index')
const UserProfile = () => import('@/views/user/profile')
const UserChat = () => import('@/views/user/chat')
const Login = () => import('@/views/user/login')
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question',
    name: 'question',
    component: Question
  },
  {
    path: '/video',
    name: 'video',
    component: Video
  },
  {
    path: '/user',
    name: 'user',
    component: User
  }
  ]
},
{
  path: '/user/profile',
  name: 'user-profile',
  component: UserProfile
},
{
  path: '/user/chat',
  name: 'user-chat',
  component: UserChat
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/search',
  name: 'search',
  component: Search
},
{
  path: '/search/result',
  name: 'search-result',
  component: SearchResult
},
{
  path: '/article',
  name: 'home-article',
  component: Article
}
]
const router = new VueRouter({
  routes
})

// 路由守卫 拦截登录
// 访问权限控制(个人中心/user,资料编辑/user/profile,小智同学/user/chat)
router.beforeEach((to, from, next) => {
  // 如果当前未登录, 但访问的路径是以/user开头,拦截登录界面(回跳)
  //  const { user } = store.state
  const user = store.state.user
  // startsWith 判断是否以指定字符开头
  if (!user.token && to.path.startsWith('/user')) {
    return next({ path: '/login', query: { redirectUrl: to.path } })
  }
  next()
})
export default router

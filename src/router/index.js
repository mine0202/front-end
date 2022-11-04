import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    // 첫 페이지 == 전체 목록 페이지
    path: '/',
    alias:'/dept',
    name: 'dept',
    component: () => import('../components/Dept/DeptList.vue')
  },
  {
    // 부서 추가 페이지
    path: '/add/dept',
    name: 'add-dept',
    component: () => import( '../components/Dept/AddDept.vue')
  },
  {
    // 부서 상세 목록 페이지
    path: '/dept/:dno',  //  : 을 이용하여 입력된다
    name: 'dept-detail',
    component: () => import( '../components/Dept/DeptDetail.vue')
  },
  {
    // 사원 목록 페이지
    path: '/emp', 
    name: 'emp',
    component: () => import( '../components/Emp/EmpList.vue')
  },
  {
    // 사원 추가 페이지
    path: '/add/emp', 
    name: 'add-emp',
    component: () => import( '../components/Emp/AddEmp.vue')
  },
  {
    // 사원 상세 목록 페이지
    path: '/emp/:eno',  //  : 을 이용하여 입력
    name: 'emp-detail',
    component: () => import( '../components/Emp/EmpDetail.vue')
  },
  {
    // faq 목록 페이지
    path: '/faq', 
    name: 'faq',
    component: () => import( '../components/Faq/FaqList.vue')
  },
  {
    // faq 추가 페이지
    path: '/add/faq', 
    name: 'add-faq',
    component: () => import( '../components/Faq/AddFaq.vue')
  },
  {
    // faq 상세 목록 페이지
    path: '/faq/:no',  //  : 을 이용하여 입력
    name: 'faq-detail',
    component: () => import( '../components/Faq/FaqDetail.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

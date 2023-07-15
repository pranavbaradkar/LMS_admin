import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import LoginView from '../views/LoginView.vue'
import ClustersView from '../views/masters/ClustersView.vue'
import AuthService from '@/services/AuthService'
import SubjectCategoryView from '../views/masters/SubjectCategoryView.vue'
import BoardsView from '../views/masters/BoardsView.vue'
import BrandsView from '../views/masters/BrandsView.vue'
import LevelsView from '../views/masters/LevelsView.vue'
import LoBankView from '../views/masters/LOBankView.vue'
import SchoolsView from '../views/masters/SchoolsView.vue'
import SkillsView from '../views/masters/SkillsView.vue'
import SubjectsView from '../views/masters/SubjectsView.vue'
import GradesView from '../views/masters/GradesView.vue'
import TestView from '../views/TestView.vue'
import QuestionBankView from '../views/QuestionBankView.vue'
import AssessmentView from '../views/AssessmentView.vue'
import RecommendationView from '../views/RecommendationView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserAssessmentView from '../views/UserAssessmentView.vue'
import TeachersView from '../views/TeachersView.vue'
import JobSeekersView from '../views/JobSeekersView.vue'
import CampaignView from '../views/CampaignView.vue'
import CreateQuestionView from '../views/CreateQuestionView.vue'
import CandidatesFormview from '../views/CandidatesFormview.vue'
import InterviewPanelView from '../views/InterviewPanelView.vue'


import CreateRolesView from '../views/CreateRolesView.vue'
import CreateAdminView from '../views/CreateAdminView.vue'
import AdminUserView from '../views/AdminUserView.vue'
import AllRolesView from '../views/AllRolesView'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: {
      requiresAuth: true,
    }
  }, 
  {
    path: '/campaign',
    name: 'campaignView',
    component: CampaignView,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/teachers',
    name: 'teachers',
    component: TeachersView,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/jobseekers',
    name: 'JobSeekersView',
    component: JobSeekersView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/question-bank',
    name: 'question bank',
    component: QuestionBankView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/create/question',
    name: 'create question',
    component: CreateQuestionView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/edit/question/:id',
    name: 'Edit question',
    component: CreateQuestionView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment',
    name: 'assessment',
    component: AssessmentView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: RecommendationView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/users/profile/:id',
    name: 'user_profile',
    component: UserProfileView,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/user-assessments',
    name: 'user-assessment',
    component: UserAssessmentView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clusters',
    name: 'clusters',
    component: ClustersView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/subject-category',
    name: 'subjectCategory',
    component: SubjectCategoryView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/boards',
    name: 'boards',
    component: BoardsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/brands',
    name: 'brands',
    component: BrandsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/grades',
    name: 'grades',
    component: GradesView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/levels',
    name: 'levels',
    component: LevelsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/lo-banks',
    name: 'lobanks',
    component: LoBankView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/schools',
    name: 'schools',
    component: SchoolsView,
    meta: {
      requiresAuth: true,
    }
  },{
    path: '/skills',
    name: 'skills',
    component: SkillsView,
    meta: {
      requiresAuth: true,
    }
  },{
    path: '/subjects',
    name: 'subjects',
    component: SubjectsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/candidates/form',
    name: 'candidates_form',
    component: CandidatesFormview,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/interview/panel',
    name: 'interview_panel',
    component: InterviewPanelView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/create-role',
    name: 'create role',
    component: CreateRolesView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/create-admin',
    name: 'create admin',
    component: CreateAdminView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin-user',
    name: 'admin user',
    component: AdminUserView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/all-roles',
    name: 'all roles',
    component: AllRolesView,
    meta: {
      requiresAuth: true,
    }
  }
]

const router = new VueRouter({
 
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router

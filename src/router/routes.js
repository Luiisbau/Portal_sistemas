const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'pages/LoginPage.vue')
  },
  {
    path: '/principal',
    name: 'principal',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "principal" */ 'layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        icono: 'dashboard',
        label: 'Inicio',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */'src/modules/dashboard/DashBoard.vue')
      },
      {
        path: 'usuarios',
        icono: 'person_add',
        label: 'Usuarios',
        name: 'usuarios',
        // meta: { isAdmin: true },
        component: () => import(/* webpackChunkName: "" */'src/modules/usuarios/UsuariosModule.vue')
      },
      {
        path: 'portales',
        icono: 'language',
        label: 'Portales',
        name: 'portales',
        // meta: { isAdmin: true },
        component: () => import(/* webpackChunkName: "" */'src/modules/portales/PortalesModule.vue')
      },
      {
        path:'permisos',
        icono: 'badge',
        label: 'Asignar Usuarios',
        name: 'permisos',
        component: () => import(/* webpackChunkName: "" */'src/modules/permisos/PermisosPortales.vue')
      },
      {
        path:'historial',
        icono: 'history',
        label: 'Historial de accesos',
        name: 'historial',
        component: () => import(/* webpackChunkName: "" */'src/modules/historialAccesso/historialAcceso.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
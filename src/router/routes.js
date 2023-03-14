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
        path: 'roles',
        icono: 'manage_accounts',
        label: 'Roles de usuarios',
        name: 'roles',
        component: () => import(/* webpackChunkName: "" */'src/modules/roles/RolesModule.vue')
      },
      {
        path: 'empresas',
        icono: 'apartment',
        label: 'Empresas',
        name: 'empresas',
        component: () => import(/* webpackChunkName: "" */'src/modules/empresas/EmpresasModule.vue')
      },
      // {
      //   path: 'departamentos',
      //   icono: 'room_preferences',
      //   label: 'Departamentos',
      //   name: 'departamentos',
      //   component: () => import(/* webpackChunkName: "" */'src/modules/configuracion/Configuracion.vue')
      // },
      {
        path: 'usuarios',
        icono: 'person_add',
        label: 'Usuarios',
        name: 'usuarios',
        // meta: { isAdmin: true },
        component: () => import(/* webpackChunkName: "" */'src/modules/usuarios/UsuariosModule.vue')
      },
      {
        path: 'sucursales',
        icono: 'corporate_fare',
        label: 'Sucursales',
        name: 'sucursales',
        // meta: { isAdmin: true },
        component: () => import(/* webpackChunkName: "" */'src/modules/sucursales/SucursalesModule.vue')
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
        label: 'Permisos Usuarios',
        name: 'permisos',
        component: () => import(/* webpackChunkName: "" */'src/modules/permisos/PermisosPortales.vue')

      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
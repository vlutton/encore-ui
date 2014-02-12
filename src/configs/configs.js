angular.module('encore.ui.configs', [])
// TODO can ROUTE_PATHS be removed?
.constant('ROUTE_PATHS', {
    'login': {
        href: '/login',
        text: 'Login'
    },
    'logout': {
        href: '/logout',
        text: 'Logout'
    },
    'cbs': {
        href: '/cbs',
        text: 'Databases'
    },
    'ticketQueues': {
        href: '/ticketqueues',
        text: 'Ticket Queues'
    }
})
.value('siteTitle', 'Encore')
.value('devicePaths', [
    { value: '/dev/xvdb', label: '/dev/xvdb' },
    { value: '/dev/xvdd', label: '/dev/xvdd' },
    { value: '/dev/xvde', label: '/dev/xvde' },
    { value: '/dev/xvdf', label: '/dev/xvdf' },
    { value: '/dev/xvdg', label: '/dev/xvdg' },
    { value: '/dev/xvdh', label: '/dev/xvdh' },
    { value: '/dev/xvdj', label: '/dev/xvdj' },
    { value: '/dev/xvdk', label: '/dev/xvdk' },
    { value: '/dev/xvdl', label: '/dev/xvdl' },
    { value: '/dev/xvdm', label: '/dev/xvdm' },
    { value: '/dev/xvdn', label: '/dev/xvdn' },
    { value: '/dev/xvdo', label: '/dev/xvdo' },
    { value: '/dev/xvdp', label: '/dev/xvdp' }
]);

import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const CadastrarEnvio = Loadable(lazy(() => import('views/cadastro')));
const UpdateEnvio = Loadable(lazy(() => import('views/update')));
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

// send list routing
const Listagem = Loadable(lazy(() => import('views/listagem')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'cadastro',
            element: <CadastrarEnvio />
        },
        {
            path: 'update',
            element: <UpdateEnvio />
        },
        {
            path: 'listagem',
            element: <Listagem />
        }
    ]
};

export default MainRoutes;

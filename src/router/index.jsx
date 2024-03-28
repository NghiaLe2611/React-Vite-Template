import NotFound from '@/components/NotFound.jsx';
import HomePage from '@/pages/home';
// import PrivateRoute from '@/components/PrivateRoute';

const routes = [
	{
		path: '/',
		element: <HomePage />,
		loader: <div>Loading...</div>,
	},

	{ path: '*', element: <NotFound /> },
];

export default routes;

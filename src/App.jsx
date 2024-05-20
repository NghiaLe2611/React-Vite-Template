import routes from '@/router';
import { useRoutes } from 'react-router-dom';

function App() {
	const element = useRoutes(routes);
	return <main className='mx-auto max-w-screen-xl w-full px-3 md:px-0'>{element}</main>;
}

export default App;

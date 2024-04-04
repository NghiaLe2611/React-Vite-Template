import routes from '@/router';
import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
	const element = useRoutes(routes);
	return (
		<QueryClientProvider client={queryClient}>
			<Box display='flex' flexDirection='column' className='h-full'>
				<Box as='main' className='mx-auto max-w-screen-xl w-full px-3 md:px-0' flex={1} py={5}>
					{element}
				</Box>
			</Box>
		</QueryClientProvider>
	);
}

export default App;

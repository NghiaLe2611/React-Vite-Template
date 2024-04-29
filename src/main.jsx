import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppProvider from './contexts/AppContext';
import './index.scss';
import { Provider } from 'react-redux';
import store from './app/store.js';
import colors from 'tailwindcss/colors';

const theme = extendTheme({
	colors: {
		primary: {
			500: '#2db064',
			600: '#279d58', // hover
			700: '#1e7f47', // click
		},
		blue: {
			500: colors.blue['500'],
			600: colors.blue['600'],
			700: colors.blue['700'],
		},
	},
	components: {
		Popover: {
			variants: {
				LOTTERY: {
					content: {
						boxShadow: '0 !important',
						position: 'fixed',
					},
				},
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<Provider store={store}>
				<AppProvider>
					<App />
				</AppProvider>
			</Provider>
		</BrowserRouter>
	</ChakraProvider>
);

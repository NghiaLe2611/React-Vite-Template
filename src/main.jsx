import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import AppProvider from './contexts/AppContext';
import './index.scss';
import {Provider} from 'react-redux';
import store from './app/store.js';

const theme = extendTheme({
	components: {
		Popover: {
			variants: {
				'LOTTERY': {
					content: {
						boxShadow: '0 !important',
						position: 'fixed'
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
	</ChakraProvider>,
);

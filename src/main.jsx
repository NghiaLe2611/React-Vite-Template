import {ChakraProvider} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import AppProvider from './contexts/AppContext';
import './index.scss';
import {Provider} from 'react-redux';
import store from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider>
		<BrowserRouter>
			<Provider store={store}>
				<AppProvider>
					<App />
				</AppProvider>
			</Provider>
		</BrowserRouter>
	</ChakraProvider>,
);

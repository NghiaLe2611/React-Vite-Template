import {createContext, useCallback, useContext, useMemo} from 'react';

export const AppContext = createContext();
export const AppUpdaterContext = createContext();

const AppProvider = ({children}) => {
	const state = useMemo(() => {
		return {};
	}, []);

	const dispatchFn = useMemo(() => {
		return {};
	}, []);

	return (
		<AppContext.Provider value={state}>
			<AppUpdaterContext.Provider value={dispatchFn}>{children}</AppUpdaterContext.Provider>
		</AppContext.Provider>
	);
};

function useAppContext() {
	const state = useContext(AppContext);
	if (typeof state === 'undefined') {
		throw new Error('useAppContext must be used within a AppProvider');
	}

	return state;
}

function useAppUpdater() {
	const dispatchFn = useContext(AppUpdaterContext);

	if (typeof dispatchFn === 'undefined') {
		throw new Error('useAppUpdater must be used within a AppProvider');
	}

	const setShowLogin = useCallback(
		(val) => {
			dispatchFn.setShowLogin(val);
		},
		[dispatchFn],
	);

	const setSelectedFile = useCallback(
		(val) => {
			dispatchFn.setSelectedFile(val);
		},
		[dispatchFn],
	);

	const setShowImport = useCallback(
		(val) => {
			dispatchFn.setShowImport(val);
		},
		[dispatchFn],
	);

	return {setShowLogin, setSelectedFile, setShowImport};
}

export {useAppContext, useAppUpdater};
export default AppProvider;

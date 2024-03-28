import {useToast} from '@chakra-ui/react';
// import { toast } from 'react-toastify';

const useCustomToast = () => {
	const toast = useToast(); 

	const showToast = (title, status, position = 'top-right', duration = 2000) => {
		toast({
			title,
			status,
			position,
			duration,
			isClosable: true,
		});
	};

	return showToast;
};

export default useCustomToast;

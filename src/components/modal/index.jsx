import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { memo } from 'react';

const CustomModal = ({ btnText, modalHeader, colorScheme = 'primary', children, closable = false }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button colorScheme={colorScheme} className='my-0.5' onClick={onOpen}>
				{btnText}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{modalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>
					{closable && (
						<ModalFooter>
							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default memo(CustomModal);

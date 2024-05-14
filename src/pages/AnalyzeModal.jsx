import { countNumberOccurrences, occurrencesWithNumber } from '@/helpers';
import useDivideArr from '@/hooks/useDivideArr';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';
import { useMemo } from 'react';

export default function AnalyzeModal({ isOpen, onClose, data, currentNumber }) {
	const arrData = useMemo(() => {
		if (data) {
			return data.map((item) => item.numbers.map((num) => Number(num)));
		}

		return [];
	}, [data]);

	const occurences = useMemo(() => {
		return occurrencesWithNumber(arrData, Number(currentNumber));
	}, [arrData, currentNumber]);

	const { firstData, secondData } = useDivideArr(occurences);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Phân tích số {Number(currentNumber)}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<h5 className='font-bold text-lg mb-2'>
							Số lần xuất hiện: {countNumberOccurrences(data, currentNumber)}
						</h5>
						<h5 className='font-bold text-lg mb-2'>Các số hay xuất hiện với số {Number(currentNumber)}</h5>
						<div className='grid grid-cols-2 gap-0.5'>
							<div>
								{firstData.map((item) => (
									<div key={item.num}>
										{item.num}: {item.count}
									</div>
								))}
							</div>
							<div>
								{secondData.map((item) => (
									<div key={item.num}>
										{item.num}: {item.count}
									</div>
								))}
							</div>
						</div>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

import { countNumberOccurrences, occurencesOfNextTime, occurrencesWithNumber } from '@/utils';
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

const OccurencesList = ({ data, currentNumber }) => {
	const occurences = useMemo(() => {
		return occurrencesWithNumber(data, Number(currentNumber));
	}, [data, currentNumber]);
	const { firstData, secondData } = useDivideArr(occurences);

	return (
		<div>
			<h5 className='font-bold mb-2'>Các số hay xuất hiện chung kỳ</h5>
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
		</div>
	);
};

const NextTimeNumberList = ({ data, currentNumber }) => {
	const occurences = useMemo(() => {
		return occurencesOfNextTime(data, Number(currentNumber));
	}, [data, currentNumber]);

    const { firstData, secondData } = useDivideArr(occurences);

	return (
		<div>
			<h5 className='font-bold mb-2'>Các số hay xuất hiện ở kỳ sau</h5>
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
		</div>
	);
};

export default function AnalyzeModal({ isOpen, onClose, data, currentNumber }) {
	const arrData = useMemo(() => {
		if (data) {
			return data.map((item) => item.numbers.map((num) => Number(num)));
		}

		return [];
	}, [data]);

    const ratio = useMemo(() => {
        if (data) {
            const count = countNumberOccurrences(data, currentNumber);
            return (count * 100) / data.length;
        }

        return null;
    }, [currentNumber, data]);
    
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minWidth={600}>
					<ModalHeader>Phân tích số {Number(currentNumber)}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<h5 className='font-bold text-lg mb-2'>
							Số lần xuất hiện: {countNumberOccurrences(data, currentNumber)} trên {data?.length} kỳ
                            &nbsp;{ratio ? `(${ratio}%)` : null}
						</h5>
						<div className='grid grid-cols-2 gap-2'>
							<OccurencesList data={arrData} currentNumber={currentNumber} />
                            <NextTimeNumberList data={arrData} currentNumber={currentNumber} />
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

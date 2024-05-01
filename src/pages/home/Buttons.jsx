import CustomModal from '@/components/modal';
import { Box, Button } from '@chakra-ui/react';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import classes from './button.module.scss';
import { countOccurrences } from '@/helpers';

const Buttons = ({ data }) => {
	const [occurences, setOccurences] = useState([]);

	useEffect(() => {
		if (data?.length) {
			const numbers = data.map((item) => item.numbers);
			const arr = [].concat(...numbers);
			const result = countOccurrences(arr);
			setOccurences(result);
		}
	}, [data]);

	// const occurences = useMemo(() => {
	// 	if (data?.length) {
	// 		const numbers = data.map((item) => item.numbers);
	// 		const arr = [].concat(...numbers);
	// 		// const unique = [...new Set(flatArray)];
	// 		return countOccurrences(arr);
	// 	}

	// 	return [];
	// }, [data]);

	console.log(111, occurences);

	const handleStats = () => {
		// const { odd, even } = countOddAndEven(data);
		// alert(`Chẵn: ${even}, Lẻ: ${odd}`);
	};

	const handleAnalyze = () => {};

	return data && data.length ? (
		<Fragment>
			<div className={classes['wrap-btn']}>
				<CustomModal colorScheme='primary' btnText='Thống kê' modalHeader='Số liệu thống kê'>
					<Box>
						<Box as='h5' className='text-lg font-bold mb-2'>Thống kê số lần xuất hiện</Box>
						<ul className={classes.list}>
							{occurences?.length > 0 &&
								occurences.map((item) => (
									<li key={item.num}>
										{item.num}: {item.count}
									</li>
								))}
						</ul>
					</Box>
				</CustomModal>

				<Button colorScheme='blue' onClick={handleAnalyze}>
					Phân tích
				</Button>
			</div>
		</Fragment>
	) : null;
};

export default memo(Buttons);

import CustomModal from '@/components/modal';
import {countOccurrences, countOddAndEven} from '@/helpers';
import {Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Fragment, memo, useEffect, useMemo, useState} from 'react';
import classes from './button.module.scss';

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

	const slices = useMemo(() => {
		return Math.round(occurences.length / 2);
	}, [occurences]);

	const handleAnalyze = () => {};

	return data && data.length ? (
		<Fragment>
			<div className={classes['wrap-btn']}>
				<CustomModal colorScheme='primary' btnText='Thống kê' modalHeader='Số liệu thống kê'>
					<Box>
						<Tabs>
							<TabList>
								<Tab _selected={{ color: 'white', bg: 'var(--bg-primary)' }} className='rounded-t-md'>Số lần xuất hiện</Tab>
								<Tab _selected={{ color: 'white', bg: 'var(--bg-primary)' }} className='rounded-t-md'>Chẵn/Lẻ</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<div className={classes.list}>
										<div>
											{occurences.slice(0, slices).map((item) => (
												<p key={item.num}>
													{item.num}: {item.count}
												</p>
											))}
										</div>
										<div>
											{occurences.slice(slices).map((item) => (
												<p key={item.num}>
													{item.num}: {item.count}
												</p>
											))}
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<p>Chẵn: <b>{countOddAndEven(data).even}</b></p>
                                    <p>Lẻ: <b>{countOddAndEven(data).odd}</b></p>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</CustomModal>

				{/* <Button colorScheme='blue' onClick={handleAnalyze}>
					Phân tích
				</Button> */}
			</div>
		</Fragment>
	) : null;
};

export default memo(Buttons);

/* eslint-disable no-mixed-spaces-and-tabs */
import axiosClient from '@/api/axiosClient';
import { countNumberOccurrences } from '@/helpers';
import {
	Box,
	Button,
	Container,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Buttons from './Buttons';
import classes from './home.module.scss';
// import styled from '@emotion/styled';

const fetchData = async () => {
	try {
		const res = await axiosClient('/crawl/lottery');
		const { status, data } = res.data;
		if (status === 200) {
			return data;
		}

		return [];
	} catch (err) {
		console.log(err);
		throw new Error('Failed to fetch data');
	}
};

const HomePage = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['lottery_result'],
		queryFn: fetchData,
	});
	const { onClose } = useDisclosure();

	const [activeNumber, setActiveNumber] = useState(null);
	const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

	// Handle mouse leave number
	useEffect(() => {
		const handleMouse = (e) => {
			if (activeNumber) {
				if (!e.target.closest('.chakra-popover__content')) {
					setActiveNumber(null);
				}
			}
		};

		document.addEventListener('mouseover', handleMouse);

		return () => {
			document.removeEventListener('mouseover', handleMouse);
		};
	}, [activeNumber]);

	const handleMouseEnter = (e, num) => {
		setActiveNumber(num);

		const { top, left } = e.target.getBoundingClientRect();
		const topPos = top + 35;
		const leftPos = left + window.scrollX + 10;

		setPopoverPosition({ top: topPos, left: leftPos });
	};

	const content = useMemo(() => {
		if (isLoading) {
			return <Spinner />;
		}

		return (
			<div className='p-2'>
				<Container maxW='container.md'>
					{data ? <div className='text-right font-medium'>Tổng: {data.length} kỳ</div> : null}
					<TableContainer className='mx-auto'>
						<Table className={classes.table}>
							<Thead>
								<Tr>
									<Th className='!text-center'>Ngày</Th>
									<Th className='!text-center'>Kết quả</Th>
								</Tr>
							</Thead>
							<Tbody>
								{data?.length
									? data.map((item) => (
											<Tr key={item.date}>
												<Td className='!text-center'>{item.date}</Td>
												<Td>
													<div className='flex justify-center mb-4'>
														{item.numbers.map((number, index) => (
															<Box
																as='span'
																key={number}
																className={classNames(`${classes.circle}`, {
																	[classes['bg-last-item']]:
																		index === item.numbers.length - 1,
																})}
																onMouseEnter={(e) => handleMouseEnter(e, number)}
																// onMouseLeave={handleMouseLeave}
															>
																{number}
															</Box>
														))}
													</div>
												</Td>
											</Tr>
									  ))
									: null}
							</Tbody>
						</Table>
					</TableContainer>
				</Container>
			</div>
		);
	}, [data, isLoading]);

	return (
		<div className='lottery-result'>
			<h1 className='text-center font-bold text-xl mb-10'>Homepage</h1>
			<div className='content text-center'>{content}</div>
			{activeNumber ? (
				<Popover
					variant='LOTTERY'
					isOpen={Boolean(activeNumber)}
					onClose={onClose}
					placement='right'
					closeOnBlur={false}>
					<PopoverTrigger>
						<Button sx={{ display: 'none' }}></Button>
					</PopoverTrigger>
					<PopoverContent
						id='number-popover'
						sx={{
							width: 'max-content',
							outline: 'none',
							boxShadow: 'none !important',
							top: popoverPosition.top,
							left: popoverPosition.left,
						}}>
						<PopoverBody>
							Xuất hiện:&nbsp;
							{activeNumber ? `${countNumberOccurrences(data, activeNumber)} lần` : null}
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : null}
            
			<Buttons data={data} />
		</div>
	);
};

export default HomePage;

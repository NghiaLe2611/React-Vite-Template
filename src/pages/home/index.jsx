/* eslint-disable no-mixed-spaces-and-tabs */
import axiosClient from '@/api/axiosClient';
import {
	Box,
	Button,
	Container,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './home.module.scss';
import { countNumberOccurrences } from '@/helpers';

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

const MyPopover = ({ anchorEl, onClose, children }) => {
	const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

	// Calculate popover position based on anchor element
	const calculatePopoverPosition = useCallback(() => {
		if (anchorEl) {
			const rect = anchorEl.getBoundingClientRect();
			setPopoverPosition({ top: rect.bottom, left: rect.left });
		}
	}, [anchorEl]);

	// Close the popover when clicked outside
	const handleClickOutside = useCallback(
		(e) => {
			if (anchorEl && !anchorEl.contains(e.target)) {
				onClose();
			}
		},
		[anchorEl, onClose],
	);

	// Calculate popover position when anchorEl changes
	useEffect(() => {
		calculatePopoverPosition();
	}, [anchorEl, calculatePopoverPosition]);

	// Close the popover when the document is clicked
	useEffect(() => {
		document.addEventListener('mouseleave', handleClickOutside);
		return () => {
			document.removeEventListener('mouseleave', handleClickOutside);
		};
	}, [handleClickOutside]);

	console.log(111, anchorEl);

	return (
		<div
			className='hahaha'
			style={{
				position: 'fixed',
				top: popoverPosition.top,
				left: popoverPosition.left,
				display: anchorEl ? 'block' : 'none',
				zIndex: 9999,
				backgroundColor: 'black',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				borderRadius: '4px',
				padding: '8px',
				color: '#fff',
				width: 100,
				height: 100,
			}}>
			{children}
		</div>
	);
};

const HomePage = () => {
	// Data [{ date, numbers: [] }]
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['lottery_result'],
		queryFn: fetchData,
	});

	const [activeNumber, setActiveNumber] = useState(null);
	const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
	const [anchorEl, setAnchorEl] = useState(null);

	// Function to handle opening the popover
	const handlePopoverOpen = (event, num) => {
		setActiveNumber(num);
		setAnchorEl(event.currentTarget);
	};

	// Function to handle closing the popover
	const handlePopoverClose = () => {
		setAnchorEl(null);
		setActiveNumber(null);
	};

	const handleMouseEnter = (number, anchor) => {
		const rect = anchor.getBoundingClientRect();
		setActiveNumber({ number, count: countNumberOccurrences(data, number) });
		setPopoverPosition({ top: rect.top + rect.height, left: rect.left });
	};

	const handleMouseLeave = () => {
		setActiveNumber(null);
	};

	const handleSetActiveNumber = (num) => {
		console.log(111, num);
		setActiveNumber((prev) => {
			if (prev !== num) return num;
			return prev;
		});
	};

	// console.log(activeNumber);
	console.log(anchorEl);

	const content = useMemo(() => {
		if (isLoading) {
			return <Spinner />;
		}

		return (
			<div className='p-2'>
				<Container maxW='container.md'>
					{data ? <div className='text-right font-medium'>Tổng: {data.length} kỳ</div> : null}
					<div>
						<strong>{activeNumber}</strong>
					</div>

					{/* <MyPopover anchorEl={anchorEl} onClose={handlePopoverClose}>
						<div>
							<p>{countNumberOccurrences(data, activeNumber)}</p>
						</div>
					</MyPopover> */}

					{/* <Popover
						isOpen={activeNumber !== null}
						onClose={handleMouseLeave}
						placement='right'
                        // style={{ top: popoverPosition.top, left: popoverPosition.left }}
						{...popoverPosition}
                        >
						<PopoverTrigger>
							<Box display='none' />
						</PopoverTrigger>
						<PopoverContent sx={{ width: 'max-content' }}>
							<PopoverBody>Xuất hiện: {countNumberOccurrences(data, activeNumber)} lần</PopoverBody>
						</PopoverContent>
					</Popover> */}

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
															<Box as='span' key={number}>
																<Popover trigger='hover'>
																	<PopoverTrigger>
																		<Button
																			className={classNames(`${classes.circle}`, {
																				[classes['bg-last-item']]:
																					index === item.numbers.length - 1,
																			})}>
																			{number}
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent
																		sx={{
																			width: 'max-content',
																		}}>
																		<PopoverBody>
																			Xuất hiện:&nbsp;
																			{countNumberOccurrences(data, number)} lần
																		</PopoverBody>
																	</PopoverContent>
																</Popover>
																{/* {activeNumber === number ? (
																	<Popover trigger='hover' isOpen={true}>
																		<PopoverTrigger>
																			<Button
																				className={classNames(
																					`${classes.circle}`,
																					{
																						[classes['bg-last-item']]:
																							index ===
																							item.numbers.length - 1,
																					},
																				)}>
																				{number}
																			</Button>
																		</PopoverTrigger>
																		<PopoverContent
																			sx={{
																				width: 'max-content',
																			}}>
																			<PopoverBody>
																				Xuất hiện:
																				{countNumberOccurrences(data, number)}
																				lần
																			</PopoverBody>
																		</PopoverContent>
																	</Popover>
																) : (
																	<Box
																		className={classNames(`${classes.circle}`, {
																			[classes['bg-last-item']]:
																				index === item.numbers.length - 1,
																		})}
																		onMouseEnter={() =>
																			setActiveNumber(number)
																		}
																		onMouseLeave={() => setActiveNumber(null)}>
																		{number}
																	</Box>
																)} */}
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

				{/* <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(data)}</pre> */}
			</div>
		);
	}, [data, isLoading]);

	return (
		<div>
			<h1 className='text-center font-bold text-xl mb-10'>Homepage</h1>
			<div className='content text-center'>{content}</div>
		</div>
	);
};

export default HomePage;

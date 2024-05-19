import CustomModal from '@/components/modal';
import { countOccurrences, countOddAndEven } from '@/helpers';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import classes from './button.module.scss';
import * as tf from '@tensorflow/tfjs';

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

	const trainModel = async (history) => {
		// Convert history to tensors
		const inputTensor = tf.tensor2d(history.map((entry) => entry.slice(0, 6)));
		const outputTensor = tf.tensor2d(history.map((entry) => entry.slice(0, 6)));

		// Define the model
		const model = tf.sequential();
		model.add(tf.layers.dense({ units: 64, inputShape: [6], activation: 'relu' }));
		model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
		model.add(tf.layers.dense({ units: 6 }));

		// Compile the model
		model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

		// Train the model
		await model.fit(inputTensor, outputTensor, {
			epochs: 100, // You can adjust the number of epochs
			shuffle: true,
		});

		return model;
	};

	const handlePredict = async () => {
        const lotteryHistory = data.map((item) => item.numbers.map(num => Number(num)));

		// Train the model
		const model = await trainModel(lotteryHistory);

		// Make a prediction using the latest data
		const latestData = lotteryHistory[0].slice(0, 6); // Use the most recent 6 numbers as input
		const predictionTensor = model.predict(tf.tensor2d([latestData]));
		const predictedNumbers = predictionTensor.dataSync();
		const roundedPredictedNumbers = Array.from(predictedNumbers).map((number) => Math.round(number));

		console.log(123, roundedPredictedNumbers);
	};

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
								<Tab _selected={{ color: 'white', bg: 'var(--bg-primary)' }} className='rounded-t-md'>
									Số lần xuất hiện
								</Tab>
								<Tab _selected={{ color: 'white', bg: 'var(--bg-primary)' }} className='rounded-t-md'>
									Chẵn/Lẻ
								</Tab>
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
									<p>
										Chẵn: <b>{countOddAndEven(data).even}</b>
									</p>
									<p>
										Lẻ: <b>{countOddAndEven(data).odd}</b>
									</p>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</CustomModal>

				<Button colorScheme='blue' onClick={handlePredict}>
					Phân tích
				</Button>
			</div>
		</Fragment>
	) : null;
};

export default memo(Buttons);

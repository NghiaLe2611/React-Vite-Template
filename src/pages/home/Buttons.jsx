import CustomModal from '@/components/modal';
import {countOccurrences, countOddAndEven} from '@/helpers';
import {Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Fragment, memo, useEffect, useMemo, useState} from 'react';
import classes from './button.module.scss';
import * as tf from '@tensorflow/tfjs';

const trainModel = async (history) => {
    const inputShape = history[0].length;
	// Convert history to tensors
	const inputTensor = tf.tensor2d(history.map((entry) => entry.slice(0, inputShape)));
	const outputTensor = tf.tensor2d(history.map((entry) => entry.slice(0, inputShape)));

	// Define the model
	const model = tf.sequential();
	model.add(tf.layers.dense({units: 64, inputShape: [inputShape], activation: 'relu'}));
	model.add(tf.layers.dense({units: 64, activation: 'relu'}));
	model.add(tf.layers.dense({units: inputShape}));

	// Compile the model
	model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

	// Train the model
	await model.fit(inputTensor, outputTensor, {
		epochs: 100, // You can adjust the number of epochs
		shuffle: true,
	});

	return model;
};

// Train the model
async function trainModel2(lotteryHistory) {
	// Prepare feature and target data
	const features = [];
	const targets = [];

	const reversedHistory = lotteryHistory.slice().reverse();

	for (let i = 0; i < reversedHistory.length - 1; i++) {
		features.push(reversedHistory[i]); // Use the entire array as features
		targets.push(reversedHistory[i + 1]); // The next draw's numbers as targets
	}

	// Convert arrays to tensors
	// const xTrain = tf.tensor2d(features);
	// const yTrain = tf.tensor2d(targets);

	// Convert arrays to tensors with explicit shape
	const xTrain = tf.tensor2d(features, [features.length, features[0].length]);
	const yTrain = tf.tensor2d(targets, [targets.length, targets[0].length]);

	// Print the tensors for verification
	// xTrain.print();
	// yTrain.print();

	// Define the model
	const model = tf.sequential();
	model.add(tf.layers.dense({units: 128, activation: 'relu', inputShape: [xTrain.shape[1]]}));
	model.add(tf.layers.dense({units: 64, activation: 'relu'}));
	// model.add(tf.layers.dense({units: 7})); // 7 output units for next draw prediction
    model.add(tf.layers.dense({ units: xTrain.shape[1], activation: 'linear' }));

	model.compile({
		optimizer: 'adam',
		loss: 'meanSquaredError', // sparseCategoricalCrossentropy
		metrics: ['accuracy'],
	});

	// Train the model
	await model.fit(xTrain, yTrain, {
		epochs: 100,
		shuffle: true,
	});

	// await model.fit(xTrain, yTrain, {
	// 	epochs: 50,
	// 	callbacks: {
	// 		onEpochEnd: (epoch, logs) => {
	// 			console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
	// 		},
	// 	},
	// });

	return model;
}

// Function to one-hot encode a draw
function oneHotEncode(draw, maxNumber = 55) {
	const oneHot = new Array(maxNumber).fill(0);
	draw.forEach((number) => {
		if (number <= maxNumber) {
			oneHot[number - 1] = 1; // Set corresponding position to 1 (0-indexed)
		}
	});
	return oneHot;
}

const Buttons = ({data}) => {
	const [occurences, setOccurences] = useState([]);

	useEffect(() => {
		if (data?.length) {
			const numbers = data.map((item) => item.numbers);
			const arr = [].concat(...numbers);
			const result = countOccurrences(arr);
			setOccurences(result);
		}
	}, [data]);

	const handlePredict = async () => {
		const lotteryHistory = data.map((item) => item.numbers.map((num) => Number(num)));

		// Train the model
		const model = await trainModel(lotteryHistory);

		// Make a prediction using the latest data
		const latestData = lotteryHistory[0].slice(0, 7); // Use the most recent 7 numbers as input
		const predictionTensor = model.predict(tf.tensor2d([latestData]));
		const predictedNumbers = predictionTensor.dataSync();
		const roundedPredictedNumbers = Array.from(predictedNumbers).map((number) => Math.round(number));
		console.log(123, roundedPredictedNumbers);
	};

	const slices = useMemo(() => {
		return Math.round(occurences.length / 2);
	}, [occurences]);

	const handleAnalyze = () => {};

	const test = async () => {
		const lotteryHistory = data.map((item) => item.numbers.map((num) => Number(num)));
		try {
			const model = await trainModel2(lotteryHistory);
			const latestData = lotteryHistory[0].slice(0, 7); // Use the most recent draw for prediction
			const predictionTensor = model.predict(tf.tensor2d([latestData]));
			const predictedNumbers = predictionTensor.dataSync();
			const roundedPredictedNumbers = Array.from(predictedNumbers).map((number) => Math.round(number));
			console.log(123, roundedPredictedNumbers);
		} catch (err) {
			console.log(123, err);
		}
	};

	return data && data.length ? (
		<Fragment>
			<div className={classes['wrap-btn']}>
				<CustomModal colorScheme='primary' btnText='Thống kê' modalHeader='Số liệu thống kê'>
					<Box>
						<Tabs>
							<TabList>
								<Tab _selected={{color: 'white', bg: 'var(--bg-primary)'}} className='rounded-t-md'>
									Số lần xuất hiện
								</Tab>
								<Tab _selected={{color: 'white', bg: 'var(--bg-primary)'}} className='rounded-t-md'>
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
				<Button onClick={test}>Test</Button>
			</div>
		</Fragment>
	) : null;
};

export default memo(Buttons);

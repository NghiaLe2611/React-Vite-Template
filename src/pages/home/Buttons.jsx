import CustomModal from '@/components/modal';
import { countOccurrences, countOddAndEven } from '@/utils';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import classes from './button.module.scss';
import * as tf from '@tensorflow/tfjs';

const MAX_NUMBER = 55;

// Train the model
async function trainModel(lotteryHistory, optimizer = 'adam', loss = 'meanSquaredError', epochs = 100) {
	// Prepare feature and target data
	const features = [];
	const targets = [];

	const reversedHistory = lotteryHistory.slice().reverse();

	for (let i = 0; i < reversedHistory.length - 1; i++) {
		features.push(reversedHistory[i]);
		targets.push(reversedHistory[i + 1]);
	}

	// Convert arrays to tensors with explicit shape
	const xTrain = tf.tensor2d(features, [features.length, features[0].length]);
	const yTrain = tf.tensor2d(targets, [targets.length, targets[0].length]);

	// xTrain.print();
	// yTrain.print();

	// Define the model
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [xTrain.shape[1]] }));
	model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
	model.add(tf.layers.dense({ units: xTrain.shape[1], activation: 'linear' }));

	model.compile({
		optimizer, // sdg, rmsprop
		loss, // sparseCategoricalCrossentropy
		metrics: ['accuracy'],
	});

	// Train the model
	await model.fit(xTrain, yTrain, {
		epochs,
		shuffle: true,
		callbacks: {
			onEpochEnd: (epoch, logs) => {
				console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
			},
		},
	});

	return model;
}

async function trainModel2(lotteryHistory, optimizer = 'adam', loss = 'meanSquaredError', epochs = 100, maxNumber = MAX_NUMBER) {
	const numberOfRows = lotteryHistory.length;
	const windowLength = 2;
	const numberOfFeatures = 7;

	// Normalize the data to the range [0, 1]
	const scaledLotteryHistory = lotteryHistory.map((row) => row.map((num) => num / maxNumber));

	// Prepare train and label data
	const train = [];
	const label = [];

	for (let i = 0; i < numberOfRows - windowLength; i++) {
		const window = scaledLotteryHistory.slice(i, i + windowLength);
		train.push(window);
		label.push(scaledLotteryHistory[i + windowLength]);
	}

	const trainTensor = tf.tensor3d(train);
	const labelTensor = tf.tensor2d(label);

	// Create the LSTM model
	const model = tf.sequential();
	model.add(
		tf.layers.lstm({
			units: 50,
			inputShape: [windowLength, numberOfFeatures],
			returnSequences: true,
		}),
	);
	model.add(tf.layers.dropout({ rate: 0.2 })); // Dropout for regularization
	model.add(tf.layers.lstm({ units: 50 })); // Second LSTM layer
	model.add(tf.layers.dropout({ rate: 0.2 })); // Dropout for regularization
	model.add(tf.layers.dense({ units: numberOfFeatures })); // Dense output layer (6 features)

	model.compile({
		optimizer,
		loss,
		metrics: ['accuracy'],
	});

	// Train the model
	await model.fit(trainTensor, labelTensor, {
		epochs,
		shuffle: true,
		callbacks: {
			onEpochEnd: (epoch, logs) => {
				console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
			},
		},
	});

	return model;
}

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

	const handlePredict = async () => {
		const lotteryHistory = data.map((item) => item.numbers.map((num) => Number(num)));
		// Train the model
		const model = await trainModel(lotteryHistory);

		// Make a prediction using the latest data
		const latestData = lotteryHistory[0].slice(0, 7); // Use the most recent 7 numbers as input
		const predictionTensor = model.predict(tf.tensor2d([latestData]));
		const predictedNumbers = predictionTensor.dataSync();
		// const roundedPredictedNumbers = Array.from(predictedNumbers).map((number) => Math.round(number));
		const roundedPredictedNumbers = Array.from(predictedNumbers).map((number) => {
			let roundedNumber = Math.round(number);
			if (roundedNumber < 1) {
				roundedNumber = 1;
			} else if (roundedNumber > 55) {
				roundedNumber = 55;
			}
			return roundedNumber;
		});
		console.log(123, roundedPredictedNumbers);
	};

	const slices = useMemo(() => {
		return Math.round(occurences.length / 2);
	}, [occurences]);

	const test = async (optimizer = 'adam') => {
		const lotteryHistory = data.map((item) => item.numbers.map((num) => Number(num)));
        console.log(123, lotteryHistory);
        return;
		const model = await trainModel2(lotteryHistory, optimizer);

		const toPredict = lotteryHistory.slice(0, 2);
		// Normalize the prediction input
		const scaledToPredict = toPredict.map((row) => row.map((value) => value / MAX_NUMBER));
		const predictionTensor = tf.tensor3d([scaledToPredict]);
		const scaledPredictionOutput = model.predict(predictionTensor);
		const predictionOutput = scaledPredictionOutput.arraySync()[0];

		// Reverse the scaling
		const inverseScaledPredictionOutput = predictionOutput.map((value) => Math.round(value * MAX_NUMBER));
		console.log(inverseScaledPredictionOutput);
	};

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
				<Button onClick={() => test()}>Test</Button>
                <Button onClick={() => test('sgd')}>Test SGD</Button>
			</div>
		</Fragment>
	) : null;
};

export default memo(Buttons);

/*
epochs (1): The number of times to iterate over the entire dataset. Increasing this value can help the model learn better but may also increase the risk of overfitting.
batchSize (32): Number of samples per gradient update. Smaller batch sizes can make the model more robust but may take longer to train. Larger batch sizes can speed up training but may require more memory.
validationSplit (0.0): Fraction of the training data to be used as validation data. A value between 0 and 1. Useful for evaluating the model on unseen data during training.
shuffle (true): Whether to shuffle the training data before each epoch. Shuffling can help the model generalize better by preventing the model from learning the order of the data.
classWeight (null): Dictionary mapping class indices to a weight for the class. Useful for handling class imbalance by giving more importance to underrepresented classes
sampleWeight (null):  Array of weights for each sample in the training data. Useful for assigning different weights to different samples
initialEpoch (0): Epoch at which to start training. Useful for resuming training from a certain point
stepsPerEpoch (null): Total number of steps (batches of samples) to draw from the generator at each epoch. If not specified, it will default to the number of samples divided by the batch size
validationSteps (null): Total number of steps (batches of samples) to draw from the validation generator at each epoch. Only relevant if validationData is provided as a generator
validationBatchSize (null): Batch size to use for validation data if validationData is a tf.data.Dataset. If unspecified, it defaults to the value of batchSize.
validationFreq (1): Specifies how often to perform validation (e.g., every 1 epoch or every 5 epochs). If a number k, validation will be run at the end of every k epochs.
callbacks(null): List of callbacks to be called during training. Callbacks can be used for tasks such as early stopping, learning rate scheduling, and more.
*/

// https://github.com/rahulmod/lottery-prediction-lstm/blob/main/lstm-lot-pred.ipynb

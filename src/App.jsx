import routes from '@/router';
import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';

const queryClient = new QueryClient();

// Function to convert lottery drawing to one-hot encoded vector
function toOneHot(drawing) {
	const oneHot = new Array(56).fill(0); // 56 numbers (1-55)
	for (const number of drawing) {
		oneHot[number - 1] = 1; // Index 0-54 corresponds to numbers 1-55
	}
	return oneHot;
}

function App() {
	const element = useRoutes(routes);
	// 1 number
	// useEffect(() => {
	// 	// Sample lottery history data (replace with your actual data source)
	// 	const lotteryHistory = [
	// 		[1, 2, 3, 4, 5, 6],
	// 		[5, 6, 7, 8, 9, 10],
	// 		[11, 20, 22, 33, 44, 55],
	// 	];

	// 	// Function to convert lottery drawing to one-hot encoded vector
	// 	function toOneHot(drawing) {
	// 		const oneHot = new Array(56).fill(0); // 56 numbers (1-55)
	// 		for (const number of drawing) {
	// 			oneHot[number - 1] = 1; // Index 0-54 corresponds to numbers 1-55
	// 		}
	// 		return oneHot;
	// 	}

	// 	async function trainModel() {
	// 		// Prepare training data
	// 		const inputs = [];
	// 		const outputs = [];
	// 		for (const drawing of lotteryHistory) {
	// 			const input = toOneHot(drawing.slice(0, -1)); // Input: all numbers except last
	// 			const output = toOneHot([drawing[drawing.length - 1]]); // Output: last number
	// 			inputs.push(input);
	// 			outputs.push(output);
	// 		}

	// 		// Create and configure the model
	// 		const model = tf.sequential();
	// 		model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [56] })); // Hidden layer
	// 		model.add(tf.layers.dense({ units: 56, activation: 'softmax' })); // Output layer

	// 		model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam' });

	// 		// Train the model
	// 		await model.fit(
	// 			tf.tensor2d(inputs), // Input tensor
	// 			tf.tensor2d(outputs), // Output tensor
	// 			{
	// 				epochs: 10, // Adjust based on dataset size
	// 				batchSize: 1, // Adjust based on dataset size
	// 			},
	// 		);

	// 		const lastDrawing = lotteryHistory[lotteryHistory.length - 1].slice(0, -1);
	// 		const inputTensor = tf.tensor2d([toOneHot(lastDrawing)]);

	// 		// Predict the next number
	// 		const predictedOutput = model.predict(inputTensor).argMax(1).dataSync()[0];
	//         console.log('Predicted next number:', predictedOutput + 1);
	// 	}

	// 	trainModel();
	// }, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Box display='flex' flexDirection='column' className='h-full'>
				<Box as='main' className='mx-auto max-w-screen-xl w-full px-3 lg:px-0' flex={1} py={5}>
					{element}
				</Box>
			</Box>
		</QueryClientProvider>
	);
}

export default App;

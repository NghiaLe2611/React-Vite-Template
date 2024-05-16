// Sample lottery history data (replace with your actual data source)
const lotteryHistory = [
	[1, 2, 3, 4, 5, 6],
	[5, 6, 7, 8, 9, 10],
	[11, 20, 22, 33, 44, 5],
];

function analyzeLotteryHistory(data) {
	const numberFrequencies = {}; // Object to store frequency of each number
	const mostFrequentNumbers = []; // Array to store most frequent numbers

	// Calculate frequency for each number
	for (const drawing of data) {
		for (const number of drawing) {
			if (numberFrequencies[number]) {
				numberFrequencies[number]++;
			} else {
				numberFrequencies[number] = 1;
			}
		}
	}

	// Find most frequent numbers (replace 3 with your desired number)
	const maxFrequency = Math.max(...Object.values(numberFrequencies));
	for (const number in numberFrequencies) {
		if (numberFrequencies[number] === maxFrequency) {
			mostFrequentNumbers.push(parseInt(number)); // Parse string key to number
		}
	}

	console.log('Number frequencies:', numberFrequencies);
	console.log('Most frequent numbers:', mostFrequentNumbers);
}

analyzeLotteryHistory(lotteryHistory);

// Count occurences of number
export function countNumberOccurrences(data, number) {
	const numberCounts = {};
	if (!data) return;

	data.forEach((item) => {
		item.numbers.forEach((number) => {
			if (numberCounts[number] === undefined) {
				numberCounts[number] = 0;
			}
			numberCounts[number]++;
		});
	});

	if (!number) return 0;

	return numberCounts[number];
}

export function countOccurrences(data) {
	if (!data || !Array.isArray(data) || data.length === 0) {
		return [];
	}

	const counts = {};
	for (let item of data) {
		if (counts[item]) {
			counts[item] += 1;
		} else {
			counts[item] = 1;
		}
	}
	const arr = Object.entries(counts).map(([num, count]) => ({ num, count }));
	return arr.sort((a, b) => b.count - a.count);
}

// Count odd/event numbers
export function countOddAndEven(data) {
	let oddCount = 0;
	let evenCount = 0;

	for (let item of data) {
		for (let numberStr of item.numbers) {
			const number = parseInt(numberStr, 10);
			if (number % 2 === 0) {
				evenCount++;
			} else {
				oddCount++;
			}
		}
	}

	return { odd: oddCount, even: evenCount };
}

export function occurrencesWithNumber(data, inputNumber) {
	const occurrences = {};

	data.forEach((arr) => {
		if (arr.includes(Number(inputNumber))) {
			// arr chính là số lần xuất hiện của number
			arr.forEach((num) => {
				if (Number(num) !== Number(inputNumber)) {
					if (occurrences[num]) {
						occurrences[num] += 1;
					} else {
						occurrences[num] = 1;
					}
				}
			});
		}
	});

	const arr = Object.entries(occurrences).map(([num, count]) => ({ num, count }));
	return arr.sort((a, b) => b.count - a.count);
}

export function occurencesOfNextTime(data, inputNumber) {
	const result = [];
	for (let i = data.length - 1; i >= 0; i--) {
		const curArr = data[i];
		if (curArr.includes(inputNumber)) {
			if (data[i - 1]) {
				result.push(data[i - 1]);
			}
		}
	}
	const arr = result.flat();
	return countOccurrences(arr);
}

// function analyzeLotteryHistory(data) {
// 	const numberFrequencies = {}; // Object to store frequency of each number
// 	const mostFrequentNumbers = []; // Array to store most frequent numbers

// 	// Calculate frequency for each number
// 	for (const drawing of data) {
// 		for (const number of drawing) {
// 			if (numberFrequencies[number]) {
// 				numberFrequencies[number]++;
// 			} else {
// 				numberFrequencies[number] = 1;
// 			}
// 		}
// 	}

// 	// Find most frequent numbers (replace 3 with your desired number)
// 	const maxFrequency = Math.max(...Object.values(numberFrequencies));
// 	for (const number in numberFrequencies) {
// 		if (numberFrequencies[number] === maxFrequency) {
// 			mostFrequentNumbers.push(parseInt(number)); // Parse string key to number
// 		}
// 	}

// 	console.log('Number frequencies:', numberFrequencies);
// 	console.log('Most frequent numbers:', mostFrequentNumbers);
// }

// function adjustPredictedNumbers(numbers) {
// 	// Ensure numbers are within the range 1-55 and unique
// 	const adjustedNumbers = new Set();
// 	for (let num of numbers) {
// 		let adjusted = Math.round(num);
// 		if (adjusted < 1) adjusted = 1;
// 		if (adjusted > 55) adjusted = 55;
// 		adjustedNumbers.add(adjusted);
// 	}

// 	// If there are less than 7 unique numbers, add random numbers to make it 7
// 	while (adjustedNumbers.size < 7) {
// 		adjustedNumbers.add(Math.floor(Math.random() * 55) + 1);
// 	}

// 	return Array.from(adjustedNumbers);
// }

// function createOptimizer(optimizerName) {
// 	switch (optimizerName) {
// 		case 'SGD':
// 			return tf.train.sgd(0.01);
// 		case 'RMSProp':
// 			return tf.train.rmsprop(0.001, 0.9);
// 		case 'Adagrad':
// 			return tf.train.adagrad(0.01);
// 		case 'Adadelta':
// 			return tf.train.adadelta(0.95);
// 		case 'Adamax':
// 			return tf.train.adamax(0.002, 0.9, 0.999);
// 		case 'Momentum':
// 			return tf.train.momentum(0.01, 0.9);
// 		default:
// 			throw new Error(`Invalid optimizer name: ${optimizerName}`);
// 	}
// }
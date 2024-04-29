// Count occurences of number
export function countNumberOccurrences(data, number) {
	const numberCounts = {};

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

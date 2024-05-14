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

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

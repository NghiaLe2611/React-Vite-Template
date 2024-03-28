export function handleDuplicateItems(array) {
	const itemMap = {};

	return array.map((item) => {
		if (!itemMap[item]) {
			itemMap[item] = 1;
			return item;
		} else {
			const newItem = `${item}_${itemMap[item]}`;
			itemMap[item]++;
			return newItem;
		}
	});
}

export function getOriginalColumnName(columnName) {
	const parts = columnName.split('_');
	return parts[0];
}

export function isValidImageUrl(url) {
	// Regular expression to match URLs starting with http or https and ending with a valid image extension
	const imageUrlRegex = /^(https?|http):\/\/.+\.(png|jpe?g|gif|bmp|webp|svg)$/i;
	return imageUrlRegex.test(url);
}

export function formatNumber(input) {
	const modifyInput = parseFloat(input).toFixed(5);
	const number = parseFloat(modifyInput);

	if (!isNaN(number)) {
		const roundedNumber = Math.round(number * 1e6) / 1e6; // Round to 6 decimal places

		// Check if the rounded number is an integer
		if (Number.isInteger(roundedNumber)) {
			return roundedNumber.toString();
		} else {
			return roundedNumber.toFixed(6).replace(/\.?0+$/, ''); // Remove trailing zeros
		}
	}

	return input;
}

export function formatFileSize(size) {
	if (size < 1024) {
		return `${size} bytes`;
	} else if (size < 1024 * 1024) {
		const sizeInKB = (size / 1024).toFixed(2);
		return `${sizeInKB} KB`;
	} else {
		const sizeInMB = (size / (1024 * 1024)).toFixed(2);
		return `${sizeInMB} MB`;
	}
}

export function getFitColumns(data) {
	const jsonKeys = Object.keys(data[0]);
	let objectMaxLength = [];
	for (let i = 0; i < data.length; i++) {
		let value = data[i];
		for (let j = 0; j < jsonKeys.length; j++) {
			if (typeof value[jsonKeys[j]] == 'number') {
				objectMaxLength[j] = 10;
			} else {
				const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

				objectMaxLength[j] = objectMaxLength[j] >= l ? objectMaxLength[j] : l;
			}
		}

		let key = jsonKeys;
		for (let j = 0; j < key.length; j++) {
			objectMaxLength[j] = objectMaxLength[j] >= key[j].length ? objectMaxLength[j] : key[j].length;
		}
	}

	const wscols = objectMaxLength.map((w) => {
		return {width: w + 5};
	});

	return wscols;
}

export function selectFieldsFromArray(array, selectedFields) {
	return array.map((item) =>
		selectedFields.reduce((selectedItem, field) => {
			if (Object.prototype.hasOwnProperty.call(item, field)) {
				selectedItem[field] = item[field];
			}
			return selectedItem;
		}, {}),
	);
}

export function cleanAndMapData(data) {
	const cleanedData = {};

	// Iterate through each property in the data
	for (const key in data) {
		// eslint-disable-next-line no-prototype-builtins
		if (data.hasOwnProperty(key)) {
			// Handle dynamic fields, replace undefined with empty string
			cleanedData[key] = data[key] !== undefined ? data[key] : '';
		}
	}

	return cleanedData;
}
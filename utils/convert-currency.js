// JavaScript script to convert
// string currency to double

// Function to convert
const convert = (currency) => {
	let k, temp;

	// Loop to make substring
	for (let i = 0; i < currency.length; i++) {
		// Getting Unicode value
		k = currency.charCodeAt(i);

		// Checking whether the character
		// is of numeric type or not
		if (k > 47 && k < 58) {
			// Making substring
			temp = currency.substring(i);
			break;
		}
	}

	// If currency is in format like
	// 458, 656.75 then we used replace
	// method to replace every ', ' with ''
	temp = temp.replace(/, /, "");

	// Converting string to float
	// or double and return
	return parseFloat(temp);
}

module.exports = convert;
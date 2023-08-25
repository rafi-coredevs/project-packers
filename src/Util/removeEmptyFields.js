/**
 * 
 * removeEmptyFields - returns filtered object with no property holding empty or null value
 * @param {Object} args.data - an object with possibility of holding null or empty value 
 * 
 */

function removeEmptyFields(data) {
	Object.keys(data).forEach((key) => {
		if (data[key] === '' || data[key] == null) {
			delete data[key];
		}
	});
	return [data];
}

export default removeEmptyFields;

/**
 * @description - removeEmptyFields - returns filtered object with no property holding empty or null value
 * @param {Object} data - an object with the possibility of holding null, empty values, or empty objects
 */
function removeEmptyFields(data) {
	for (const key in data) {
	  if (data[key] === '' || data[key] === null) {
		delete data[key];
	  } else if (typeof data[key] === 'object') {
		removeEmptyFields(data[key]);
		if (Object.keys(data[key]).length === 0) {
		  delete data[key];
		}
	  }
	}
	return data;
  }
  
  export default removeEmptyFields;
  
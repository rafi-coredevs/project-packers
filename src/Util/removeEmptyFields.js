/**
 *
 * @param {object} data
 * @returns an array holding that object after filtering against empty or null value for any property.
 */

function removeEmptyFields(data) {
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] == null) {
      delete data[key];
    }
  });
  return [data];
}

export default removeEmptyFields;

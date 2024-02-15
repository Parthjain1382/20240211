/**1)C-Create function is responsible for creating an new record in json file
 * @param {path} folderName It takes as an input the folder path
 * @param {string} fileName It takes the fileName as an string
 * @param {object} newObject The object that needs to appended
 * @param {funciton} callback The callback function for errors
 */
function ceateRecords(folderName, fileName, newObject, callback) {
  const filePath = path.join(folderName, fileName + '.json');

  // Read existing JSON data from file
  fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
          console.error('Error reading file:', readErr);
          callback(readErr);
          return;
      }

      let jsonData;
      try {
          // Parse existing JSON data
          jsonData = JSON.parse(data);
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          callback(parseError);
          return;
      }

      // Ensure jsonData is an array
      if (!Array.isArray(jsonData)) {
          jsonData = [];
      }

      // Enclose new object in curly brackets if it's not already enclosed
      const formattedNewObject = (
        newObject.charAt(0) === '{' &&          // Check if the first character is '{'
        newObject.charAt(newObject.length - 1) === '}' // Check if the last character is '}'
         ) ? 
        newObject :                             // If already enclosed, use newObject as is
        `{${newObject}}`;                       // If not enclosed, add curly brackets around newObject
    
      // Append new object to JSON data
      try {
          jsonData.push(JSON.parse(formattedNewObject));
      } catch (parseError) {
          console.error('Error parsing new object:', parseError);
          callback(parseError);
          return;
      }

      // Convert JSON data back to string
      const updatedData = JSON.stringify(jsonData, null, 2);

      // Write updated JSON data back to file
      fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
          if (writeErr) {
              console.error('Error writing to file:', writeErr);
              callback(writeErr);
              return;
          }
          callback(null, jsonData);
      });
  });
}
// const folderName = 'C:\\Desktop\\aspire\\folder5';
// const fileName = 'example';
// const newObject = '{"key": "value"}'; // Object enclosed in curly brackets

// ceateRecords(folderName, fileName, newObject, (err, updatedData) => {
//   if (err) {
//       console.error('Error:', err);
//   } else {
//       console.log('Object appended successfully.');
//       console.log('Updated JSON data:', updatedData);
//   }
// });

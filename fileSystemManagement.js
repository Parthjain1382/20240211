// /** This program is responsible for perform CRUD operations on the folder,
//  * file and text in the files present
//  * files is equivalent to Tabble 
//  * Here records is equivalent to lines in the files
//  */


// requrire the fs module
const fs = require('fs');
const path = require('path');

//To implement the CRUD operation on the folder system system
/**1)C- Creating an folder(directory) using the path specified
 * @param {path} folderPath It take the Specific Path
 * @param {Function} callback It takes input as callback function
 */
function createFolder(folderPath, callback) {
  // Checking if the folder exists at the specified path
  fs.access(folderPath, (err) => {
      if (err) {
          // If the folder doesn't exist, create it
          fs.mkdir(folderPath, (err) => {
              if (err) {
                  callback('Error creating folder: ' + err);
              } else {
                  callback(null, 'Folder created');
              }
          });
      } else {
          callback(null, 'Folder already exists');
      }
  });
}
// let folderPath='.\\folder5'
// createFolder(folderPath, (err,message) => {
//   if (err) {
//       console.error(err);
//   }
//   else
//   {
//     console.log(message)
//   }
// });



/**2) R- Read an Folder content with the path specfied
 * @param {path} folderPath It takes input the folder path
 * @param {function} callback It takes callback function as parameter
*/
function readFolder(folderPath, callback) {
  fs.readdir(folderPath, 'utf-8', (err, files) => {
      if (err) {
          // If an error occurs, pass the error to the callback
          callback(err, null);
      } else {
          // If successful, pass the files to the callback
          callback(null, files);
      }
  });
}
//setting the path
// folderPath1='.\\folder5'
// readFolder(folderPath1, (err, files) => {
//   if (err) {
//       console.error("An error occurred while reading the folder:", err);
//   } else {
//       console.log("Files in the folder:");
//       files.forEach(file => {
//           console.log(file);
//       });
//   }
// });


/**3) Update the Folder name
 * @param {path} folderPath1 It passes the path of folder 1
 * @param {path} folderPath2 It passes the path of folder 2
 * @param {callback} callback t takes callback function as parameter
 */
function updateFolder(folderPath1, folderPath2, callback) {
  fs.rename(folderPath1, folderPath2, function(err) {
      if (err) {
          callback(err); // Pass error to the callback
      } else {
          callback(null); // Pass null to indicate success
      }
  });
}
// const folderPath1 = '.\\folder5';
// const folderPath2 = '.\\folder6';
// updateFolder(folderPath1, folderPath2, function(err) {
//   if (err) {
//       console.log('Error occurred:', err);
//   } else {
//       console.log('Successfully updated');
//   }
// });



/**4) Delete the folder with namw
 * @param {path} folderPath takes the path of first folder
 * @param {callback} callback It takes callback function as parameter 
 */
function deleteFolder(folderPath, callback) {
  fs.rmdir(folderPath, (err) => {
      if (err) {
        //if error occurs
          console.log('Error occurred:', err);
          callback(err);
      } else {
          console.log(`${folderPath} is deleted!`);
          callback(null);
      }
  });
}
// const folderPath = '.\\folder6';
//calling the delete folder function and including the callback function
// deleteFolder(folderPath, (err)=> {
//   if (err) {
//       console.error('Error occurred during folder deletion:', err);
//   } else {
//       console.log(`${folderPath} has been successfully deleted.`);
//   }
// });


/************************************To perform CRUD operation on files system*********************************************************/


/**1)C- Create and write a file using
 * @param {path} filePath It takes the filepath as input
 * @param {function} callback It takes callback function as parameter
 */
function writeFile(filePath, callback) {
    fs.writeFile(filePath, '{id: 123}', function(err) {
        if (err) {
            console.error("Error creating the file:", err);
            callback(err);
        } else {
            console.log("File created successfully.");
            callback(null);
        }
    });
}
// const filePath = '.\\folder5\\example.json';
// writeFile(filePath, function(err) {
//     if (err) {
//         console.error('Error occurred during file creation:', err);
//     } else {
//         console.log(`${filePath} has been successfully created.`);
//     }
// });




// /**2)R-Reading the file
//  * @param {path} filePath It takes the filepath as input
//  * @param {function} callback It takes callback function as parameter
//  **/
// function readFile(filePath, callback) {
//     fs.readFile(filePath, 'utf8', function(err, data) {
//         if (err) {
//             console.error(err);
//             callback(err);
//         } else {
//             console.log(data);
//             callback(null, data);
//         }
//     });
// }

// Example usage:
// const filePath = 'example.txt';
// readFile(filePath, function(err, data) {
//     if (err) {
//         console.error('Error occurred during file reading:', err);
//     } else {
//         console.log(`Content of ${filePath}:`);
       
//     }
// })


/**3) Update a file which is same as updating a line
 * @param {path} filePath It is used to give file path
 * @param {object} searchObject the search object that needs to be search
 * @param {object} newContentObject The change new object.
 */
function updateTable(folderName, fileName, searchKey, searchValue, newObject, callback) {
    const filePath = path.join(folderName, fileName + '.json');

    // Read existing JSON data from file
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            callback(readErr);
            return;
        }

        let existingData;
        try {
            // Parse existing JSON data
            existingData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            callback(parseError);
            return;
        }

        // Find the index of the object with the specified key-value pair
        const index = existingData.findIndex(obj => obj[searchKey] === searchValue);
        if (index !== -1) {
            // Replace the object at the found index with the new object
            existingData[index] = newObject;
        } else {
            console.error('Object not found with key:', searchKey, 'and value:', searchValue);
            callback(new Error('Object not found'));
            return;
        }

        // Convert updated data back to JSON string
        const updatedData = JSON.stringify(existingData, null, 2);

        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                callback(writeErr);
                return;
            }

            console.log('Content updated successfully.');
            callback(null, existingData);
        });
    });
}
// const folderName = 'C:\\Desktop\\aspire\\folder5';
// const fileName = 'example';
// const searchKey = 'apple'; // Key to search for in the objects
// const searchValue = 450; // Value corresponding to the key
// const newObject = {
//     "google": 450
// };

// // Calling the function
// updateTable(folderName, fileName, searchKey, searchValue, newObject, (err, updatedData) => {
//     if (err) {
//         console.error('Error:', err);
//     } else {
//         console.log('Updated JSON structure:', updatedData);
//     }
// });
  

/**4) Deleting an file using the file path
 * @param {path} filepath It take input as an filepath
 * @param {function} callback It takes callback function as parameter
*/
function deleteFile(filePath, callback) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        console.log('File deleted successfully');
        callback(null); // No error, call the callback with null as the error parameter
    });
}
// const filePath = '.\\example.txt';
// deleteFile(filePath, (err) => {
//     if (err) {
//         console.error('Error:', err);
//     } else {
//         console.log('File deletion completed.');
//     }
// });



/*******************************CRUD operations on records(lines) of the file1**********************************************/


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



/** 2) R-Read a new line in the filePath
 * @param {path} filePath It take input as path of file
 * @param {key} key It takes the key  
 * @returns {callback} It takes input as callback function
 */
function readLine(filePath, key, callback) {
    // Read the entire file as a string
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        try {
            // Parse the JSON content
            const jsonData = JSON.parse(data);

            // Extract the value associated with the specified key
            const value = jsonData[key];

            // Check if the key exists in the JSON data
            if (value === undefined) {
                callback(new Error(`Key '${key}' not found in JSON data`));
                return;
            }

            // Callback with the key-value pair object
            const result = {};
            result[key] = value;
            callback(null, result);
        } catch (parseError) {
            callback(parseError);
        }
    });
}
// const filePath = '.\\folder5\\example.json';
// const key = 'innovapptive'; // Specify the key to read
// readLine(filePath, key, (err, obj) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Object:', obj);
// });



/**4)D- Delete function to delete records in a table using the key 
 * @param {path} filePath the file path that has the table
 * @param {object} objectToDelete The object that to be deleted
 * @param {funciton} callback It takes input as callback function
*/
function deleteObject(filePath, objectToDelete, callback) {
    // Read the contents of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        try {
            // Parse the JSON content
            const jsonData = JSON.parse(data);

            // Check if the objectToDelete key exists
            if (!(objectToDelete in jsonData)) {
                callback(new Error('Object not found'));
                return;
            }

            // Delete the key-value pair from the object
            delete jsonData[objectToDelete];

            // Write the updated JSON content back to the file
            fs.writeFile(filePath, JSON.stringify(jsonData, null), 'utf8', (writeErr) => {
                if (writeErr) {
                    callback(writeErr);
                    return;
                }
                callback(null);
            });
        } catch (parseError) {
            callback(parseError);
        }
    });
}
// const filePath5 = '.\\folder5\\example.json';
// const objectToDelete = "google"; // Specify the key to delete
// deleteObject(filePath5, objectToDelete, (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Object deleted successfully');
//     }
// });


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

let folderPath='.\\folder5'
createFolder(folderPath, (err,message) => {
  if (err) {
      console.error(err);
  }
  else
  {
    console.log(message)
  }
});



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

setting the path
folderPath1='.\\folder5'
readFolder(folderPath1, (err, files) => {
  if (err) {
      console.error("An error occurred while reading the folder:", err);
  } else {
      console.log("Files in the folder:");
      files.forEach(file => {
          console.log(file);
      });
  }
});




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

const folderPath1 = '.\\folder5';
const folderPath2 = '.\\folder6';
updateFolder(folderPath1, folderPath2, function(err) {
  if (err) {
      console.log('Error occurred:', err);
  } else {
      console.log('Successfully updated');
  }
});



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

const folderPath = '.\\folder6';
calling the delete folder function and including the callback function
deleteFolder(folderPath, (err)=> {
  if (err) {
      console.error('Error occurred during folder deletion:', err);
  } else {
      console.log(`${folderPath} has been successfully deleted.`);
  }
});




//To perform CRUD operation on files system

/**1)C- Create and write a file using
 * @param {path} filePath It takes the filepath as input
 * @param {function} callback It takes callback function as parameter
 */
function writeFile(filePath, callback) {
    fs.writeFile(filePath, 'abc', function(err) {
        if (err) {
            console.error("Error creating the file:", err);
            callback(err);
        } else {
            console.log("File created successfully.");
            callback(null);
        }
    });
}


// const filePath = 'example.txt';
// writeFile(filePath, function(err) {
//     if (err) {
//         console.error('Error occurred during file creation:', err);
//     } else {
//         console.log(`${filePath} has been successfully created.`);
//     }
// });




/**2)R-Reading the file
 * @param {path} filePath It takes the filepath as input
 * @param {function} callback It takes callback function as parameter
 **/
function readFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            console.log(data);
            callback(null, data);
        }
    });
}

Example usage:
const filePath = 'example.txt';
readFile(filePath, function(err, data) {
    if (err) {
        console.error('Error occurred during file reading:', err);
    } else {
        console.log(`Content of ${filePath}:`);
       
    }
})





/**3) Update a file which is same as updating a line
 * @param {} filePath It is used to give file path
 * @param {object} searchObject the search object that needs to be search
 * @param {object} newContentObject The change new object.
 */
function updateTable(folderName, FileName, newContentObject, callback) {
    const filePath = path.join(folderName, FileName + '.json');

    // Convert the new content object to a JSON string with pretty formatting
    const contentString = JSON.stringify(newContentObject, null, 2);

    // Write the new content object to the file, replacing the existing content
    fs.writeFile(filePath, contentString, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing to file:', writeErr);
            callback(writeErr);
            return;
        }

        // Read the updated content from the file
        fs.readFile(filePath, 'utf8', (readErr, updatedData) => {
            if (readErr) {
                console.error('Error reading updated file:', readErr);
                callback(readErr);
                return;
            }

            try {
                // Parse the updated data as JSON
                const updatedObject = JSON.parse(updatedData);
                console.log('Updated content:', updatedObject);
                callback(null, updatedObject);
            } catch (parseError) {
                console.error('Error parsing updated JSON:', parseError);
                callback(parseError);
            }
        });
    });
}


const folderName = 'C:\\Desktop\\aspire';
const FileName = 'file';
const newContentObject = {
    "innovapptive": 1536,
    "google": 1554,
    "apple": 54545
};

updateTable(folderName, FileName, newContentObject, (err, updatedObject) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Content replaced successfully.');
        console.log('Updated JSON structure:', updatedObject);
    }
});



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

const filePath = '.\\example.txt';
deleteFile(filePath, (err) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('File deletion completed.');
    }
});



// //CRUD operations on records(lines) of the file1

/** 1) R-Read a new line in the filePath
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

const filePath = './file.json';
const key = 'innovapptive'; // Specify the key to read
readLine(filePath, key, (err, obj) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Object:', obj);
});



/**2)D- Delete function to delete records in a table
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
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
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

// Example usage:
const filePath = './file.json';
const objectToDelete = "innovapptive"; // Specify the key to delete
deleteObject(filePath, objectToDelete, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Object deleted successfully');
    }
});


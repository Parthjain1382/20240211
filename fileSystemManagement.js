/** This program is responsible for perform CRUD operations on the folder,
 * file and text in the files present
 * files is equivalent to Tabble 
 * Here records is equivalent to lines in the files
 */

// requrire the fs moduleand directory path 
const fs = require('fs');


//To implement the CRUD operation on the folder system system
/**1)C- Creating an folder(directory) using the path specified
 * @param {path} folderPath It take the Specific Path
 */
function createFolder(folderPath1){
// try and catch for error detection
  try {
    //checking if the folder exist at specified path
    if (!fs.existsSync(folderPath1)) {
      fs.mkdirSync(folderPath1);
      console.log('Folder created\n');
    }
    else {
      console.log('Already exists\n');
    }
  } // throwing error
  catch (err) {
    console.error('Error creating folder:\n');
  }
}

// folderPath1='.\\folder5'
// createFolder(folderPath1)


//2) R- Read an Folder content with the path specfied
function readFolder(folderPath1){

  let file;
  //specifying the folder Path
  fs.readdir(folderPath1,'utf-8',function(err,file)
  {
      if(err){
      console.log("error occurred while reading the folder",err)
      return;
      }

      console.log("File in the folder are :");
      file.forEach(file =>{
          console.log(file)
      })
  })
}

// folderPath1='.\\folder5'
// readFolder(folderPath1)



/**3) Update the Folder name
 * @param {path} folderPath1 It passes the path of folder 1
 * @param {path} folderPath2 It passes the path of folder 2
 */
function updateFolder(folderPath1,folderPath2){
    try {
      fs.renameSync(folderPath1,folderPath2);
      console.log('Successfully Updated \n')
    } catch (err) {
      console.log('error occured',err);
    }
}

// const folderPath1 = 'c:\\Desktop\\aspire\\folder5';
// const folderPath2 = 'c:\\Desktop\\aspire\\folder6';
// updateFolder(folderPath1,folderPath2)



/**4) Delete the folder with namw
 * @param {path} folderPath2 takes the path of first folder
 */
function deleteFolder(folderPath2){
    fs.rmdir(folderPath2, err => {
      if (err) {
        throw err;
      }
      console.log(`${folderPath2} is deleted!`);
    });
}

// const folderPath2 = 'c:\\Desktop\\aspire\\folder6';
// deleteFolder(folderPath2)




// //To perform CRUD operation on files system

/**1)C- Create and write a file using
 * @param {path} filePath It takes the filepath as input
 */
function writeFile(filePath){
  fs.writeFile(filePath, 'abc', (err) => {
    if (err) {
        console.error("Error creating the file:", err);
        return;
    }
    console.log("File created successfully.");
  });
}
const filePath='.\\file.txt';
writeFile(filePath)


/**2)Reading the file
 * @param {path} filePath It takes the filepath as input
 */
function readFile(filePath){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

// const filePath='.\\file.txt';
// readFile(filePath)



/**3) Update a file which is same as update a line
 * @param {path} filePath It is used to give file path
 * @param {object} searchObject the search object that needs to be search
 * @param {object} changeObject change made 
 */
function updateLine(filePath, searchObject, newContentObject) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Split the file content into lines
        const lines = data.split('\n');

        // Find the index of the line containing the searchObject
        const lineIndex = lines.findIndex(line => {
            try {
                const lineObject = JSON.parse(line);
                return JSON.stringify(lineObject) === JSON.stringify(searchObject);
            } catch (error) {
                return false;
            }
        });

        if (lineIndex === -1) {
            console.error('Search object not found in the file.');
            return;
        }

        // Update the content of the found line
        lines[lineIndex] = JSON.stringify(newContentObject);

        // Join the lines back together
        const updatedContent = lines.join('\n');

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Line updated successfully.');
        });
    });
}

// Example usage:
// const filePath = '.\\file.txt';
// const searchObject = { innovapptive:1536}; // Object to search for in the file
// const newContentObject = { google : 1554  }; // New content for the line

// updateLine(filePath, searchObject, newContentObject);
// const filePath='.\\file.txt';
//  updateFile(filePath)



/**4) Deleting an file using the file path
 * @param {filepath} filepath It take input as an filepath
 */

function deleteFile(filePath){
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File deleted successfully');
  });
}

// const filePath='.\\file.txt';
// deleteFile(filePath)







//CRUD operations on records(lines) of the file1)

/** 1) C-Create(append) a new line in the filePath
 * @param {path} filePath It take input as path of file
 * @param {string} content The content that needs to be append 
*/

function createToFile(filePath, content) {
    // Convert content to string
    const contentString = JSON.stringify(content);

    // Append the new line to the file
    fs.appendFile(filePath, `${contentString}\n`, (err) => {
        if (err) {
            console.error('Error appending file:', err);
            return;
        }
        console.log('New line appended to the file successfully.');
    });
}

// Example usage:
// const filePath = '.\\file.txt';
// const newContent = {
//     innovapptive: 1536
// };
// createToFile(filePath, newContent);


/** 2) R-Read a new line in the filePath
 * @param {path} filePath It take input as path of file
 * @param {number} lineNumber It takes the line number 
 * @returns {callback} If error occurs
*/
const readline = require('readline');

function readLine(filePath, lineNumber, callback) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  let lineCount = 0;

  // Listen for the 'line' event, which occurs whenever a new line is read
  rl.on('line', (line) => {
    lineCount++;

    // If the current line number matches the desired line number, return it
    if (lineCount === lineNumber) {
      rl.close();
      callback(null, line);
    }
  });

  // Listen for the 'close' event, which occurs when the entire file has been read
  rl.on('close', () => {
    // If the desired line was not found, return an error
    if (lineCount < lineNumber) {
      callback(new Error('Line number exceeds total lines in the file'));
    }
  });
}

// Example usage:
// const filePath = './file.txt'; // Corrected file path syntax
// const lineNumber = 1; // Specify the line number to read
// readLine(filePath, lineNumber, (err, line) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(`Line ${lineNumber}: ${line}`);
// });




/**3)D- Delete function to delete records in a table
 * @param {path} filePath the file path that has the table
 * @param {number} lineToDelete Line number to be delete
*/
function deleteLine(filePath, lineToDelete) {
    // Read the contents of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Split the contents into an array of lines
        let lines = data.split('\n');

        // Remove the line at the specified line number
        if (lineToDelete > 0 && lineToDelete <= lines.length) {
            lines.splice(lineToDelete - 1, 1); // Adjusting to 0-based indexing
        } else {
            console.error('Invalid line number');
            return;
        }

        // Write the updated contents back to the file
        fs.writeFile(filePath, lines.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Line deleted successfully');
        });
    });
}

// // Example usage:
// const filePath5 = '.\\file.txt';
// const lineToDelete = 1; // Specify the line number to delete
// deleteLine(filePath5, lineToDelete);




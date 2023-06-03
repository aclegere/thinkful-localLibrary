function findAuthorById(authors, id) {
  const match = authors.find(author => author.id === id);
  return match; 
}

function findBookById(books, id) {
  const match = books.find(book => book.id === id);
  return match; 
}

function partitionBooksByBorrowedStatus(books) {
    //partition - two arrays  
    const checkedOut = [];
    const returned = [];

  //we are looking at an array of book objects, using for/of to iterate over array. book being the variable and books being the array of objects passed into the function 
    for (const book of books) {
      //use array destructuring to extract the first transaction object
      const [borrowed] = book.borrows; 
  
      if (borrowed.returned) { 
        returned.push(book);
      } else {
        checkedOut.push(book);
      }
    }
  
    return [checkedOut, returned];
}


function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  const borrowArr = book.borrows; 

  for (const borrow of borrowArr) {
    const { id, returned } = borrow;

    const account = accounts.find(acc => acc.id === id);
  
    const newObj = { ...account, returned };
    borrowers.push(newObj);
    
    if (borrowers.length === 10) {
      break; // Stop if 10 borrowers have been added
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

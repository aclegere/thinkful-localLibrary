function findAccountById(accounts, id) {
  const match = accounts.find(account => account.id === id);
  return match;  
}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((acc1, acc2) => (acc1.name.last > acc2.name.last ? 1 : -1))
  return sorted; 
}

function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;

  const totalBorrows = books.reduce((count, book) => {
    //count is the accumaltor, book is the current value, initial value of zero 
    const borrowCount = book.borrows.filter(borrow => borrow.id === accountID).length;
    //we are going to go into the current value (book) and use dot notation to access the borrows array, then run the filter method to check for matches which returns a new array. can simply add .length to the end which will result in a number equal to the length of the array. will store this in a variable and return it
    return count + borrowCount;
  }, 0);

  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;

  //filter the books that are currently checked out 
  const checkedOut = books.filter(book => {
    const borrow = book.borrows[0]; 
    return borrow.id === accountID && !borrow.returned;
  });

  //map the checked out books to include the author information, map will return an array 
  const booksWithAuthor = checkedOut.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    //create a new obj using the spread operator (...book) and simply adding author object stored in variable
    return {
      ...book,
      author
    };
  });

  return booksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

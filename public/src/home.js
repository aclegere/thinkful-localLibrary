//helper function to calculate length of array 
const getTotal = arr => arr.length;

const getTotalBooksCount = books => getTotal(books);
const getTotalAccountsCount = accounts => getTotal(accounts);

function getBooksBorrowedCount(books) {
  const borrowArr = books.filter(book => book.borrows[0].returned === false)
  return getTotal(borrowArr)
}

//helper- this will be used to sort the arrays, we can then slice 0,5 
function sortObjs(arr, prop) {
  return arr.sort((item1, item2) => item2[prop] - item1[prop]);
}

function getMostCommonGenres(books) {
  const genreCounts = {};
  for (const book of books) {
    const genre = book.genre;
    if (genreCounts[genre]) {
      genreCounts[genre] += 1;
    } else {
      genreCounts[genre] = 1;
    }
  }

  // Convert genre counts into an array of objects, object.keys creates array which we can iterate over and return an array of objects 
  const genres = Object.keys(genreCounts).map((genre) => {
    return {
      name: genre,
      count: genreCounts[genre],
    };
  });

  //use helper 
  const sortedGenres = sortObjs(genres, "count");

  //use slice to get indexes 0-4
  return sortedGenres.slice(0, 5); 
}

function getMostPopularBooks(books) {
  const bookBorrowCount = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length,
    };
  });

  const sortedBooks = sortObjs(bookBorrowCount, "count");

  return sortedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
   const authorBorrowCount = authors.map((author) => {
    const authorBooks = books.filter((book) => book.authorId === author.id);
    const borrowCount = authorBooks.reduce(
      (count, book) => count + book.borrows.length,
      0
    );
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  const sortedAuthors = sortObjs(
    authorBorrowCount,
    "count"
  );

  return sortedAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

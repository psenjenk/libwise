import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export interface Book {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
}

export interface Member {
  id: string;
  name: string;
  contact: string;
  checkedOutBooks: string[]; // Array of ISBNs
}

export interface CheckoutRecord {
  isbn: string;
  memberId: string;
  checkoutDate: string;
  dueDate: string;
  returned: boolean;
  fineAmount?: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKS_FILE = path.join(DATA_DIR, 'books.csv');
const MEMBERS_FILE = path.join(DATA_DIR, 'members.csv');
const CHECKOUTS_FILE = path.join(DATA_DIR, 'checkouts.csv');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize CSV files if they don't exist
const initializeFile = (filePath: string, headers: string[]) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, headers.join(',') + '\n');
  }
};

initializeFile(BOOKS_FILE, ['isbn', 'title', 'author', 'genre', 'publicationYear', 'totalCopies', 'availableCopies']);
initializeFile(MEMBERS_FILE, ['id', 'name', 'contact', 'checkedOutBooks']);
initializeFile(CHECKOUTS_FILE, ['isbn', 'memberId', 'checkoutDate', 'dueDate', 'returned', 'fineAmount']);

export const readCSV = <T>(filePath: string): T[] => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
  });
};

export const writeCSV = <T>(filePath: string, data: T[]) => {
  const content = stringify(data, { header: true });
  fs.writeFileSync(filePath, content);
};

export const getBooks = (): Book[] => {
  return readCSV<Book>(BOOKS_FILE);
};

export const getMembers = (): Member[] => {
  return readCSV<Member>(MEMBERS_FILE);
};

export const getCheckouts = (): CheckoutRecord[] => {
  return readCSV<CheckoutRecord>(CHECKOUTS_FILE);
};

const validateBook = (book: Omit<Book, 'availableCopies'>) => {
  if (!book.isbn || book.isbn.length < 10) {
    throw new Error('ISBN must be at least 10 characters long');
  }
  if (!book.title) {
    throw new Error('Title is required');
  }
  if (!book.author) {
    throw new Error('Author is required');
  }
  if (!book.genre) {
    throw new Error('Genre is required');
  }
  if (!book.publicationYear || book.publicationYear < 0) {
    throw new Error('Publication year must be a positive number');
  }
  if (!book.totalCopies || book.totalCopies < 1) {
    throw new Error('Total copies must be at least 1');
  }
};

const validateMember = (member: Omit<Member, 'checkedOutBooks'>) => {
  if (!member.id) {
    throw new Error('Member ID is required');
  }
  if (!member.name) {
    throw new Error('Member name is required');
  }
  if (!member.contact) {
    throw new Error('Contact information is required');
  }
};

export const addBook = (book: Omit<Book, 'availableCopies'>) => {
  validateBook(book);
  const books = getBooks();
  if (books.some(b => b.isbn === book.isbn)) {
    throw new Error('Book with this ISBN already exists');
  }
  const newBook: Book = {
    ...book,
    availableCopies: book.totalCopies,
  };
  books.push(newBook);
  writeCSV(BOOKS_FILE, books);
  return newBook;
};

export const registerMember = (member: Omit<Member, 'checkedOutBooks'>) => {
  validateMember(member);
  const members = getMembers();
  if (members.some(m => m.id === member.id)) {
    throw new Error('Member with this ID already exists');
  }
  const newMember: Member = {
    ...member,
    checkedOutBooks: [],
  };
  members.push(newMember);
  writeCSV(MEMBERS_FILE, members);
  return newMember;
};

export const checkoutBook = (isbn: string, memberId: string) => {
  if (!isbn) throw new Error('ISBN is required');
  if (!memberId) throw new Error('Member ID is required');

  const books = getBooks();
  const members = getMembers();
  const checkouts = getCheckouts();

  const book = books.find(b => b.isbn === isbn);
  const member = members.find(m => m.id === memberId);

  if (!book) throw new Error('Book not found');
  if (!member) throw new Error('Member not found');
  if (book.availableCopies <= 0) throw new Error('No copies available');
  if (member.checkedOutBooks.length >= 3) throw new Error('Member has reached checkout limit');

  const checkoutDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const checkoutRecord: CheckoutRecord = {
    isbn,
    memberId,
    checkoutDate: checkoutDate.toISOString(),
    dueDate: dueDate.toISOString(),
    returned: false,
  };

  book.availableCopies--;
  member.checkedOutBooks.push(isbn);
  checkouts.push(checkoutRecord);

  writeCSV(BOOKS_FILE, books);
  writeCSV(MEMBERS_FILE, members);
  writeCSV(CHECKOUTS_FILE, checkouts);

  return checkoutRecord;
};

export const returnBook = (isbn: string, memberId: string) => {
  if (!isbn) throw new Error('ISBN is required');
  if (!memberId) throw new Error('Member ID is required');

  const books = getBooks();
  const members = getMembers();
  const checkouts = getCheckouts();

  const book = books.find(b => b.isbn === isbn);
  const member = members.find(m => m.id === memberId);
  const checkout = checkouts.find(
    c => c.isbn === isbn && c.memberId === memberId && !c.returned
  );

  if (!book) throw new Error('Book not found');
  if (!member) throw new Error('Member not found');
  if (!checkout) throw new Error('No active checkout found');

  const returnDate = new Date();
  const dueDate = new Date(checkout.dueDate);
  const daysOverdue = Math.max(0, Math.floor((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const fineAmount = daysOverdue * 0.5;

  book.availableCopies++;
  member.checkedOutBooks = member.checkedOutBooks.filter(b => b !== isbn);
  checkout.returned = true;
  checkout.fineAmount = fineAmount;

  writeCSV(BOOKS_FILE, books);
  writeCSV(MEMBERS_FILE, members);
  writeCSV(CHECKOUTS_FILE, checkouts);

  return { fineAmount, daysOverdue };
};

export const searchBooks = (query: string) => {
  const books = getBooks();
  const lowerQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.genre.toLowerCase().includes(lowerQuery) ||
    book.isbn.includes(query)
  );
};

export const generateReports = () => {
  const books = getBooks();
  const members = getMembers();
  const checkouts = getCheckouts();

  const activeCheckouts = checkouts.filter(c => !c.returned);
  const overdueBooks = activeCheckouts.filter(c => {
    const dueDate = new Date(c.dueDate);
    return new Date() > dueDate;
  });

  return {
    checkedOutBooks: activeCheckouts.map(c => ({
      ...c,
      book: books.find(b => b.isbn === c.isbn),
      member: members.find(m => m.id === c.memberId),
    })),
    overdueBooks: overdueBooks.map(c => ({
      ...c,
      book: books.find(b => b.isbn === c.isbn),
      member: members.find(m => m.id === c.memberId),
      daysOverdue: Math.floor((new Date().getTime() - new Date(c.dueDate).getTime()) / (1000 * 60 * 60 * 24)),
    })),
    availableBooks: books.filter(b => b.availableCopies > 0),
    allMembers: members,
  };
}; 
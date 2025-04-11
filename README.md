# LibWise

A modern library management system with a command-line interface (CLI) built using Next.js and TypeScript.

## Features

- **Book Management**
  - Add new books with details (title, author, ISBN, genre, publication year, total copies)
  - Track available copies
  - Search books by title, author, genre, or ISBN

- **Member Management**
  - Register members with name, contact information, and unique member ID
  - Track books checked out by members (limit: 3 books per member)

- **Checkout & Return**
  - Checkout books with automatic due date calculation (14 days)
  - Return books with fine calculation ($0.50/day if overdue)

- **Reports**
  - View all checked-out books with due dates and member details
  - View overdue books with fine amounts
  - View available books
  - View all registered members

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/libwise.git
   cd libwise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Data Storage

The application stores data in CSV files located in the `data` directory:
- `books.csv`: Book information
- `members.csv`: Member information
- `checkouts.csv`: Checkout records

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI
- CSV parsing and writing

## License

MIT

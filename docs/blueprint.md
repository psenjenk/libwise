# **App Name**: LibWise

## Core Features:

- Interactive CLI Menu: Text-based menu for library operations (add book, register member, checkout, return, search, generate reports, exit).
- Book Addition: Add new books with details (title, author, ISBN, genre, publication year, total copies) to a CSV file.
- Member Registration: Register new members with name, contact information, and a unique member ID, storing info in a CSV file.
- Book Checkout: Facilitate book checkout, updating book availability and member's checked-out list in respective CSV files. Impose a limit of 3 books per member.
- Book Return & Fine Calculation: Manage book returns, updating book availability, and calculating fines for overdue books using an AI tool. Fines are $0.50/day overdue. Store transactions in CSV files.
- Book Search: Search books by title, author, genre, or ISBN and display availability from data stored in CSV files.
- Report Generation: Generate reports on checked-out books, overdue books (with fines), available books, and a list of all members. Data is sourced from CSV files.

## Style Guidelines:

- Primary color: Dark blue (#24292F) for a professional feel.
- Secondary color: Light gray (#E5E5E5) for readability.
- Accent: Teal (#26A69A) for highlighting important information or actions.
- Clear, monospaced font for easy data alignment in the command line.
- Well-structured menu with clear labels and numbers for easy navigation.

## Original User Request:
Design a command-line library management system with the following features:

Book Management

Add new books with details: title, author, ISBN (unique), genre, publication year, and total copies.

Track available copies (automatically updated when books are checked out/returned).

Member Management

Register members with name, contact information, and a unique member ID.

Track books currently checked out by a member (limit: 3 books per member).

Checkout & Return

Checkout books: Verify availability, update member’s checked-out list, set due date (14 days from checkout).

Return books: Update availability, calculate fines ($0.50/day if overdue).

Search & Reports

Search books by title, author, genre, or ISBN, and display availability.

Generate reports:

All checked-out books (with due dates and member details).

Overdue books (highlight fines owed).

List of all available books.

List of all members.

Data Persistence

Store book and member data in CSV/text files. Reload data when the program restarts.

User Interface

Text-based menu with options:

Copy
1. Add Book  
2. Register Member  
3. Checkout Book  
4. Return Book  
5. Search Books  
6. Generate Report  
7. Exit  
Handle invalid inputs gracefully (e.g., non-existent ISBN/member ID, invalid dates).

Example Workflow:

A librarian uses the system to add a new book ("The Great Gatsby", ISBN 12345, 5 copies).

Member "Alice" (ID 001) checks out the book. The system reduces available copies to 4 and logs a due date.

When Alice returns the book 16 days later, the system calculates a $1.00 fine and updates availability to 5.

Technical Notes:

Use Python (or a language of your choice) with basic file I/O for data storage.

Include input validation and error handling.

Deliverable:
A working script with the above functionality and documentation on how to run it.
  
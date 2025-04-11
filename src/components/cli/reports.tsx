import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateReports } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Reports() {
  const [reports, setReports] = useState<ReturnType<typeof generateReports>>({
    checkedOutBooks: [],
    overdueBooks: [],
    availableBooks: [],
    allMembers: [],
  });

  const refreshReports = () => {
    const newReports = generateReports();
    setReports(newReports);
  };

  useEffect(() => {
    refreshReports();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Library Reports</h2>
        <Button onClick={refreshReports}>Refresh Reports</Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Checked Out Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.checkedOutBooks.map((checkout) => (
                <div key={`${checkout.isbn}-${checkout.memberId}`} className="border rounded-lg p-4">
                  <p><strong>Book:</strong> {checkout.book?.title}</p>
                  <p><strong>Member:</strong> {checkout.member?.name}</p>
                  <p><strong>Due Date:</strong> {new Date(checkout.dueDate).toLocaleDateString()}</p>
                </div>
              ))}
              {reports.checkedOutBooks.length === 0 && (
                <p className="text-center text-muted-foreground">No books are currently checked out.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.overdueBooks.map((checkout) => (
                <div key={`${checkout.isbn}-${checkout.memberId}`} className="border rounded-lg p-4">
                  <p><strong>Book:</strong> {checkout.book?.title}</p>
                  <p><strong>Member:</strong> {checkout.member?.name}</p>
                  <p><strong>Due Date:</strong> {new Date(checkout.dueDate).toLocaleDateString()}</p>
                  <p><strong>Days Overdue:</strong> {checkout.daysOverdue}</p>
                  <p><strong>Fine Amount:</strong> ${(checkout.daysOverdue * 0.5).toFixed(2)}</p>
                </div>
              ))}
              {reports.overdueBooks.length === 0 && (
                <p className="text-center text-muted-foreground">No books are currently overdue.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.availableBooks.map((book) => (
                <div key={book.isbn} className="border rounded-lg p-4">
                  <p><strong>Title:</strong> {book.title}</p>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}</p>
                </div>
              ))}
              {reports.availableBooks.length === 0 && (
                <p className="text-center text-muted-foreground">No books are currently available.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.allMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4">
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>ID:</strong> {member.id}</p>
                  <p><strong>Contact:</strong> {member.contact}</p>
                  <p><strong>Checked Out Books:</strong> {member.checkedOutBooks.length}</p>
                </div>
              ))}
              {reports.allMembers.length === 0 && (
                <p className="text-center text-muted-foreground">No members are currently registered.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
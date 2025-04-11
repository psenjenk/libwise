import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchBooks } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SearchBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchBooks>>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchResults = searchBooks(query);
    setResults(searchResults);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Books</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, genre, or ISBN"
            />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </form>

      <div className="grid gap-4">
        {results.map((book) => (
          <Card key={book.isbn}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Publication Year:</strong> {book.publicationYear}</p>
                <p><strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 && query && (
          <p className="text-center text-muted-foreground">No books found matching your search.</p>
        )}
      </div>
    </div>
  );
} 
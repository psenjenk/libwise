import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addBook } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function AddBookForm() {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    totalCopies: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({
        isbn: formData.isbn,
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        publicationYear: parseInt(formData.publicationYear),
        totalCopies: parseInt(formData.totalCopies),
      });
      toast({
        title: 'Success',
        description: 'Book added successfully',
      });
      setFormData({
        isbn: '',
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        totalCopies: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add book',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="publicationYear">Publication Year</Label>
        <Input
          id="publicationYear"
          type="number"
          value={formData.publicationYear}
          onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalCopies">Total Copies</Label>
        <Input
          id="totalCopies"
          type="number"
          value={formData.totalCopies}
          onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Book</Button>
    </form>
  );
} 
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkoutBook } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function CheckoutBookForm() {
  const [formData, setFormData] = useState({
    isbn: '',
    memberId: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const checkout = await checkoutBook(formData.isbn, formData.memberId);
      toast({
        title: 'Success',
        description: `Book checked out successfully. Due date: ${new Date(checkout.dueDate).toLocaleDateString()}`,
      });
      setFormData({
        isbn: '',
        memberId: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to checkout book',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="isbn">Book ISBN</Label>
        <Input
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="memberId">Member ID</Label>
        <Input
          id="memberId"
          value={formData.memberId}
          onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Checkout Book</Button>
    </form>
  );
} 
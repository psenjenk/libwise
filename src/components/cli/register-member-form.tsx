import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerMember } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function RegisterMemberForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    contact: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMember({
        id: formData.id,
        name: formData.name,
        contact: formData.contact,
      });
      toast({
        title: 'Success',
        description: 'Member registered successfully',
      });
      setFormData({
        id: '',
        name: '',
        contact: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to register member',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="id">Member ID</Label>
        <Input
          id="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact Information</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Register Member</Button>
    </form>
  );
} 
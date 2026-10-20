import { z } from 'zod';

export const contactCategories = [
  'General Inquiry',
  'Diplovia 2026 Registration',
  'Diplovia 2026 Committees',
  'Institutional Workshop & Training',
  'Campus Ambassador Application',
  'Join the Community',
  'Sponsorship & Partnership',
  'Other',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  phone: z.string().trim().max(30).optional(),
  institution: z.string().trim().max(150).optional(),
  category: z.enum(contactCategories),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(150),
  message: z.string().trim().min(20, 'Message must be at least 20 characters').max(1000, 'Message must be under 1000 characters'),
});

export type ContactFields = z.infer<typeof contactSchema>;

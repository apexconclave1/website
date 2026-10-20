import { z } from 'zod';

export const RegistrationStep1Schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone or WhatsApp contact number'),
  track: z.enum(['HIGH_SCHOOL', 'COLLEGIATE'], {
    message: 'Please select an educational track (High School Grades 8–12 or Collegiate)',
  }),
  institutionName: z.string().min(2, 'Institution or School name is required'),
  delegationType: z.enum(['INDIVIDUAL', 'DOUBLE_DELEGATION', 'DELEGATION_HEAD'], {
    message: 'Please select your delegation structure',
  }),
  partnerName: z.string().optional(),
  city: z.string().min(2, 'City of residence is required'),
  country: z.string().min(2, 'Country of residence is required'),
});

export const RegistrationStep2Schema = z.object({
  firstChoiceCommittee: z.string().min(1, 'Please select your primary committee choice'),
  firstChoiceCountry: z.string().min(1, 'Please select your primary country allocation'),
  secondChoiceCommittee: z.string().min(1, 'Please select your secondary committee choice'),
  secondChoiceCountry: z.string().min(1, 'Please select your secondary country allocation'),
  thirdChoiceCommittee: z.string().optional(),
  thirdChoiceCountry: z.string().optional(),
});

export const RegistrationStep3Schema = z.object({
  experienceLevel: z.enum([
    'FIRST_TIME',
    'INTERMEDIATE_1_3',
    'ADVANCED_4_7',
    'VETERAN_8_PLUS',
  ], {
    message: 'Please select your diplomatic experience level',
  }),
  priorAwards: z.string().optional(),
  motivation: z
    .string()
    .min(30, 'Statement of intent must be at least 30 characters explaining your diplomatic vision')
    .max(1200, 'Statement of intent must be under 1200 characters'),
  portfolioSampleUrl: z
    .string()
    .url('Please provide a valid URL to your previous resolution or writing sample')
    .optional()
    .or(z.literal('')),
});

export const RegistrationStep4Schema = z.object({
  acceptCodeOfConduct: z.literal(true, {
    message: 'You must agree to the Code of Conduct',
  }),
  verifyAccuracy: z.literal(true, {
    message: 'You must certify the accuracy of your academic details under anti-forgery rules',
  }),
});

export const PaymentSchema = z.object({
  paymentUtr: z
    .string()
    .min(8, 'UTR / Transaction Reference must be at least 8 characters')
    .max(30, 'UTR must not exceed 30 characters')
    .regex(/^[A-Za-z0-9]+$/, 'UTR must contain only letters and numbers'),
});

export const CouponSchema = z.object({
  couponCode: z
    .string()
    .min(3, 'Coupon code must be at least 3 characters')
    .max(30, 'Coupon code must not exceed 30 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Coupon code must contain only letters and numbers')
    .toUpperCase(),
});

/** Full registration form data (Steps 1–4, submitted before payment) */
export const FullRegistrationSchema = RegistrationStep1Schema
  .and(RegistrationStep2Schema)
  .and(RegistrationStep3Schema)
  .and(RegistrationStep4Schema);

/** Body of POST /api/register */
export const RegistrationRequestSchema = FullRegistrationSchema.and(
  z.object({
    eventId: z.string().min(1),
    utm_source: z.string().max(100).optional(),
    utm_medium: z.string().max(100).optional(),
    utm_campaign: z.string().max(100).optional(),
  })
);

export type RegistrationFormData = z.infer<typeof FullRegistrationSchema>;
export type Step1FormData = z.infer<typeof RegistrationStep1Schema>;
export type Step2FormData = z.infer<typeof RegistrationStep2Schema>;
export type Step3FormData = z.infer<typeof RegistrationStep3Schema>;
export type Step4FormData = z.infer<typeof RegistrationStep4Schema>;
export type PaymentFormData = z.infer<typeof PaymentSchema>;
export type CouponFormData = z.infer<typeof CouponSchema>;

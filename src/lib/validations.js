// src/lib/validations.js
import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  residencyCountry: z.string().min(1, 'Current residency is required'),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  passportNumber: z.string().min(6, 'Passport number required'),
  aadhaarNumber: z.string().regex(/^[0-9]{12}$/, 'Aadhaar must be 12 digits').optional(),
});

export const investmentProfileSchema = z.object({
  investmentExperience: z.enum(['beginner', 'intermediate', 'advanced']),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
  investmentHorizon: z.enum(['short', 'medium', 'long']),
  annualIncome: z.enum(['<50k', '50k-100k', '100k-500k', '500k-1m', '>1m']),
  investmentAmount: z.string().min(1, 'Investment amount required'),
});


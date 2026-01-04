import { Patient, Product, Doctor, Appointment, SalesData } from './types';

export const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Maria Gonzalez', dob: '1985-04-12', phone: '555-0101', allergies: ['Penicillin'], lastVisit: '2023-10-15' },
  { id: '2', name: 'Juan Perez', dob: '1978-11-23', phone: '555-0102', allergies: [], lastVisit: '2023-11-01' },
  { id: '3', name: 'Ana Lopez', dob: '1992-06-30', phone: '555-0103', allergies: ['Sulfa'], lastVisit: '2023-09-20' },
  { id: '4', name: 'Carlos Ruiz', dob: '1955-02-14', phone: '555-0104', allergies: [], lastVisit: '2023-10-30' },
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sofia Martinez', specialty: 'General Medicine', licenseNumber: 'MED-12345' },
  { id: '2', name: 'Dr. Alejandro Silva', specialty: 'Pediatrics', licenseNumber: 'PED-67890' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', sku: 'PHA-001', name: 'Paracetamol 500mg', price: 45.00, stock: 120, category: 'Analgesic', expiryDate: '2025-05-01', requiresPrescription: false },
  { id: '2', sku: 'PHA-002', name: 'Amoxicillin 500mg', price: 120.00, stock: 45, category: 'Antibiotic', expiryDate: '2024-12-01', requiresPrescription: true },
  { id: '3', sku: 'PHA-003', name: 'Ibuprofen 400mg', price: 60.50, stock: 80, category: 'Analgesic', expiryDate: '2025-08-15', requiresPrescription: false },
  { id: '4', sku: 'PHA-004', name: 'Loratadine 10mg', price: 35.00, stock: 200, category: 'Antihistamine', expiryDate: '2026-01-20', requiresPrescription: false },
  { id: '5', sku: 'PHA-005', name: 'Omeprazole 20mg', price: 85.00, stock: 60, category: 'Gastric', expiryDate: '2024-11-10', requiresPrescription: false },
  { id: '6', sku: 'PHA-006', name: 'Metformin 850mg', price: 95.00, stock: 30, category: 'Diabetes', expiryDate: '2024-10-05', requiresPrescription: true },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '101', patientId: '1', patientName: 'Maria Gonzalez', doctorId: '1', date: '2023-11-15', time: '09:00', status: 'Scheduled', reason: 'Annual Checkup' },
  { id: '102', patientId: '2', patientName: 'Juan Perez', doctorId: '1', date: '2023-11-15', time: '09:30', status: 'Completed', reason: 'Flu Symptoms' },
  { id: '103', patientId: '3', patientName: 'Ana Lopez', doctorId: '2', date: '2023-11-15', time: '10:00', status: 'Scheduled', reason: 'Child Vaccination' },
];

export const SALES_DATA: SalesData[] = [
  { name: 'Mon', sales: 4000, consultations: 5 },
  { name: 'Tue', sales: 3000, consultations: 8 },
  { name: 'Wed', sales: 5000, consultations: 6 },
  { name: 'Thu', sales: 2780, consultations: 4 },
  { name: 'Fri', sales: 6890, consultations: 10 },
  { name: 'Sat', sales: 8390, consultations: 12 },
  { name: 'Sun', sales: 3490, consultations: 3 },
];

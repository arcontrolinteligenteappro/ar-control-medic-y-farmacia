export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  MEDICAL = 'MEDICAL',
  PHARMACY = 'PHARMACY',
  ADMIN = 'ADMIN',
  REPORTS = 'REPORTS'
}

export enum MedicalTab {
  PATIENTS = 'PATIENTS',
  APPOINTMENTS = 'APPOINTMENTS',
  CONSULTATION = 'CONSULTATION',
  DOCTORS = 'DOCTORS'
}

export enum PharmacyTab {
  POS = 'POS',
  INVENTORY = 'INVENTORY',
  SALES_HISTORY = 'SALES_HISTORY'
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  allergies: string[];
  lastVisit: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  licenseNumber: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  expiryDate: string;
  requiresPrescription: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  reason: string;
}

export interface SalesData {
  name: string;
  sales: number;
  consultations: number;
}

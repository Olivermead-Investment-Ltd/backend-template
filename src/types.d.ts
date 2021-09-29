import { Request } from 'express';

type Customer = {
  id: string;
  lga: string;
  title: string;
  email: string;
  state: string;
  gender: string;
  country: string;
  zipCode: string;
  lastName: string;
  firstName: string;
  telephone: string;
  createdAt: string;
  updatedAt: string;
  homeAddress: string;
};

type CreateErr = (message: string, code?: number, validations?: object) => Error;

type FullRequest = Request & {
  user: Customer;
  destination?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
};

type AppError = Error & {
  code: number;
  name?: string;
  message: string;
  validations?: object | null;
};

type Fix = any;

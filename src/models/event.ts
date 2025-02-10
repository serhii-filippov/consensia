import { Request } from 'express';

export interface Event {
    EventTime: string;
    EventName: string;
    EntityName: string;
    Sequence: number;
    Payload: any;
  }
  
  export interface CustomerCreatedPayload {
    customerId: string;
    name: string;
  }
  
  export interface CustomerDeletedPayload {
    customerId: string;
  }
  
  export interface OrderPlacedPayload {
    orderId: string;
    customerId: string;
    totalAmount: number;
  }
  
  export interface OrderReturnedPayload {
    orderId: string;
    customerId: string;
  }
  
  export interface OrderCanceledPayload {
    orderId: string;
    customerId: string;
  }

  export interface AuthenticatedRequest extends Request {
    customerId?: string;
  }
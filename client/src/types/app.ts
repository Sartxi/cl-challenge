import { ApolloError } from "@apollo/client";

export enum Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export enum Status {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export interface Theme {
  theme: string;
  setTheme: () => void;
}

export interface Error {
  error: ApolloError;
}

export interface Incident {
  id: any;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
}

export interface GlobalState {
  allIncidents?: Incident[];
  fetchIncidents?: () => void;
  editIncident?: number | null;
  setEditIncident?: (id: number | null) => void;
  toast?: ToastProps | null;
  setToast?: (toast: ToastProps | null) => void;
}

export interface ConfirmProps {
  text: string;
  callback: () => void;
  close: () => void;
}

export interface ToastProps {
  text: string;
  status: 'success' | 'warning' | 'danger';
  duration: number;
}

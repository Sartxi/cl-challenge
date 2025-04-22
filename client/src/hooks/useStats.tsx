import { Severity, Status } from '../types/app';

export default function useStats() {
  const severityOptions = Object.keys(Severity).map((key: string) => Severity[key as keyof typeof Severity]);
  const statusOptions = Object.keys(Status).map((key: string) => Status[key as keyof typeof Status]);
  return { severityOptions, statusOptions };
}

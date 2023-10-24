import moment from "moment";

export function formatTimestamp(date: moment.Moment): string {
  return date.format("yyyy-MM-DD");
}

export function isNumeric(value?: string): boolean {
  return (
    value !== undefined &&
    !isNaN(value as any) &&
    !isNaN(parseFloat(value)) &&
    isFinite(parseFloat(value))
  );
}
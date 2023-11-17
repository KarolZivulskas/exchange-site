import moment from "moment";

export function formatTimestamp(date: moment.Moment): string {
  return date.format("yyyy-MM-DD");
}

export function isNumeric(value?: string): boolean {
  return (
    value !== undefined && 
    !isNaN(value as unknown) && // any tipas kompiliatoriaus netikrinamas tipo validavimu, tad saugiau jį pakeisti į unknown (arba konkretų tipą). Tai gali tapti saugumo problema arba bug'ų šaltiniu
    !isNaN(parseFloat(value)) &&
    isFinite(parseFloat(value))
  );
}

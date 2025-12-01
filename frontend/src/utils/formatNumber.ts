export default function formatNumber(number: number): string {
  if (number === undefined || number === null || number <= 0) {
    return "0";
  }
  const abbreviations = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
  ];
  const index = Math.floor(Math.log10(number) / 3);
  const scaledNumber = number / Math.pow(1000, index);
  if (number < 1000) {
    return `${scaledNumber}${abbreviations[index]}`; // Something like 78.00 looks bad, this would result in 78
  }
  return `${scaledNumber.toFixed(2)}${abbreviations[index]}`;
}

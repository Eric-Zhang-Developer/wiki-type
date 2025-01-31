export default function cleanString(str : string): string {
  console.log("Uncleaned Text: ", str);
  str = str.replace(/[\n=]/g, ' ');
  str = str.replace(/[^\w\s,.'()]/g, '');
  return str;
}

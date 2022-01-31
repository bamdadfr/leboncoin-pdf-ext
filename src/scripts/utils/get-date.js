/**
 * @description Utility function to get the current date
 * @returns {{date: string, time: string}} - Returns an object with the current date and time
 */
export function getDate() {
  const test = new Date();
  const diff = -test.getTimezoneOffset() * 60 * 1000; // example UTC+2: returns -(-120)
  const now = new Date(Date.now() + diff);
  const iso = now.toISOString();
  const date = iso.slice(0, 10);
  const time = iso.slice(11, 19);

  return {
    date,
    time,
  };
}
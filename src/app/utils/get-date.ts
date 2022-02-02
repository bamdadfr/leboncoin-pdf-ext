type GetDate = {
  date: string;
  time: string;
}

/**
 * Get the current date and time
 *
 * @returns {GetDate} - The current date and time
 */
export function getDate(): GetDate {
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

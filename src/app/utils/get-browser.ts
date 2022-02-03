type GetBrowser = typeof chrome

/**
 * Get the browser instance
 *
 * @returns {GetBrowser} - The browser instance (chrome or firefox)
 */
export function getBrowser(): GetBrowser {
  return chrome;
}

/**
 * Safari (WebKit) only moves Tab focus to links with "Press Tab to highlight each item" enabled;
 * Option+Tab is the default way to reach links there. Use it so keyboard tests cover links.
 */
export const tabKey = (browserName: string) => (browserName === 'webkit' ? 'Alt+Tab' : 'Tab');

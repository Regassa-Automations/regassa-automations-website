import { test } from '@playwright/test';

/** Run the enclosing describe block only in the named Playwright project. */
export function onlyIn(project: 'mobile' | 'desktop'): void {
  test.beforeEach(({}, testInfo) => {
    // 'mobile' also matches 'mobile-webkit'; 'desktop' matches 'desktop-firefox'.
    test.skip(!testInfo.project.name.startsWith(project), `runs in the ${project} projects`);
  });
}

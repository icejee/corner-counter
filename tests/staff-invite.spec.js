const { test, expect } = require('@playwright/test');

test('company admin can create invite and user can accept it', async ({ page }) => {
  await page.goto('http://localhost:8080');
  // login as admin
  await page.fill('#login-username', 'admin');
  await page.fill('#login-password', 'admin123');
  await page.click('.login-btn');
  await page.waitForSelector('[data-action="nav"][data-screen="staff"]');
  await page.click('[data-action="nav"][data-screen="staff"]');
  // create invite
  await page.click('[data-action="invite-company"]');
  await page.waitForTimeout(200);
  const invCode = await page.evaluate(()=>{ const c=JSON.parse(localStorage.getItem('cc_companies_v1'))[0]; return (c.invites && c.invites.length) ? c.invites[c.invites.length-1].code : null; });
  expect(invCode).toBeTruthy();
  // logout and accept invite
  await page.click('[data-action="logout"]');
  await page.click('[data-action="open-invite-accept"]');
  await page.fill('#invite-code-input', invCode);
  await page.fill('#invite-name-input', 'E2E User');
  await page.fill('#invite-username-input', 'e2euser1');
  await page.fill('#invite-password-input', 'pw');
  await page.click('[data-action="save-invite-accept"]');
  // verify session
  await page.waitForTimeout(200);
  const session = JSON.parse(await page.evaluate(()=>localStorage.getItem('cc_session_v1')));
  expect(session).toBeTruthy();
  expect(session.username).toBe('e2euser1');
});

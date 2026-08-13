import { test, expect } from '@playwright/test';

test('GET sample API returns 200 and expected JSON', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(res.ok()).toBeTruthy();
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('userId');
  expect(body).toHaveProperty('title');
});
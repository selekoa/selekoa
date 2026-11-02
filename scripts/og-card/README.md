# Share card

`card.html` is the source of `public/og/selekoa-card.png`, the image that link previews show (`og:image`, set in `src/site/site-config.ts`). To change it, edit `card.html`, render it at 1200×627 with a headless browser (for example Playwright: `page.setViewportSize({ width: 1200, height: 627 })`, then `page.screenshot()`), and replace the PNG. Keep the text in step with the start page's introduction.

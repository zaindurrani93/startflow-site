export function wrapEmailTemplate(contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f4ec;">
        <div style="background-color: #f8f4ec;">
          ${contentHtml}
        </div>
      </body>
    </html>
  `;
}

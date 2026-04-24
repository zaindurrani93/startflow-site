export function wrapEmailTemplate(contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>
          :root {
            color-scheme: light only;
            supported-color-schemes: light only;
          }

          body,
          table,
          td,
          div,
          p,
          a,
          span {
            font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif !important;
          }

          .email-shell {
            background-color: #f8f4ec !important;
          }

          .email-card {
            background-color: #fffefd !important;
          }

          .email-footer {
            background-color: #fffaf1 !important;
          }

          .email-text-primary {
            color: #171717 !important;
          }

          .email-text-muted {
            color: #5f564a !important;
          }

          .email-text-brand {
            color: #8f6a2f !important;
          }

          .email-border {
            border-color: #eadfcb !important;
          }

          u + .body .gmail-blend-screen {
            background: #000;
            mix-blend-mode: screen;
          }

          u + .body .gmail-blend-difference {
            background: #000;
            mix-blend-mode: difference;
          }

          @media (prefers-color-scheme: dark) {
            .email-shell {
              background-color: #f8f4ec !important;
            }

            .email-card {
              background-color: #fffefd !important;
            }

            .email-footer {
              background-color: #fffaf1 !important;
            }

            .email-text-primary {
              color: #171717 !important;
            }

            .email-text-muted {
              color: #5f564a !important;
            }

            .email-text-brand {
              color: #8f6a2f !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f4ec;">
        <div class="body email-shell" style="background-color: #f8f4ec;">
          <div class="gmail-blend-screen" style="background: #000; background-image: linear-gradient(#000, #000); mix-blend-mode: screen;">
            <div class="gmail-blend-difference" style="background: #000; background-image: linear-gradient(#000, #000); mix-blend-mode: difference;">
              ${contentHtml}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

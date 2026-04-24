export function wrapEmailTemplate(contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
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
          span,
          strong,
          h1,
          h2,
          h3 {
            font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif !important;
            color: #24160c !important;
            -webkit-text-fill-color: #24160c !important;
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
            color: #24160c !important;
            -webkit-text-fill-color: #24160c !important;
          }

          .email-text-muted {
            color: #5f4d39 !important;
            -webkit-text-fill-color: #5f4d39 !important;
          }

          .email-text-brand {
            color: #8f6a2f !important;
            -webkit-text-fill-color: #8f6a2f !important;
          }

          .email-border {
            border-color: #eadfcb !important;
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
              color: #24160c !important;
              -webkit-text-fill-color: #24160c !important;
            }

            .email-text-muted {
              color: #5f4d39 !important;
              -webkit-text-fill-color: #5f4d39 !important;
            }

            .email-text-brand {
              color: #8f6a2f !important;
              -webkit-text-fill-color: #8f6a2f !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f4ec;">
        <div class="body email-shell" style="background-color: #f8f4ec;">
          ${contentHtml}
        </div>
      </body>
    </html>
  `;
}

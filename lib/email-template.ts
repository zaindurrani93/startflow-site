const TEXT_COLOR = "#1f1a17";
const LABEL_COLOR = "#6b5b4a";
const BORDER_COLOR = "#eadfce";

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
            supported-color-schemes: light;
          }
          body, table, td, div, p, span {
            color: ${TEXT_COLOR} !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #ffffff;">
        <div style="background-color: #ffffff;">
          ${contentHtml}
        </div>
      </body>
    </html>
  `;
}

export function buildEmailShell(contentHtml: string) {
  return `
    <div style="margin: 0; padding: 24px 12px; background-color: #ffffff !important;">
      <div style="margin: 0 auto; max-width: 680px; background-color: #ffffff !important;">
        ${contentHtml}
      </div>
    </div>
  `;
}

export function buildEmailHeader(title: string, logoUrl?: string) {
  const logoHtml = logoUrl
    ? `<img src="${logoUrl}" alt="StartFlow logo" style="display:block; margin:0 auto 14px; width:120px; height:auto; border:0; background-color:#ffffff !important;" />`
    : "";

  return `
    <div style="padding: 0 0 22px; text-align: center; background-color: #ffffff !important;">
      ${logoHtml}
      <div style="font-size: 24px; font-weight: 700; line-height: 1.25; color: ${TEXT_COLOR} !important; background-color: #ffffff !important;">
        ${title}
      </div>
    </div>
  `;
}

export function buildEmailSection(title: string, contentHtml: string) {
  return `
    <div style="margin-bottom: 18px; padding: 18px; border: 1px solid ${BORDER_COLOR}; background-color: #ffffff !important;">
      <div style="margin-bottom: 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${LABEL_COLOR} !important; background-color: #ffffff !important;">
        ${title}
      </div>
      ${contentHtml}
    </div>
  `;
}

export function buildEmailField(label: string, value: string) {
  return `
    <div style="margin-bottom: 12px; background-color: #ffffff !important;">
      <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${LABEL_COLOR} !important; background-color: #ffffff !important;">
        ${label}
      </div>
      <div style="font-size: 15px; line-height: 1.5; color: ${TEXT_COLOR} !important; background-color: #ffffff !important;">
        ${value}
      </div>
    </div>
  `;
}

export function buildEmailLongField(label: string, value: string) {
  return `
    <div style="margin-bottom: 12px; background-color: #ffffff !important;">
      <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${LABEL_COLOR} !important; background-color: #ffffff !important;">
        ${label}
      </div>
      <div style="font-size: 15px; line-height: 1.6; color: ${TEXT_COLOR} !important; background-color: #ffffff !important; white-space: pre-wrap;">
        ${value}
      </div>
    </div>
  `;
}

export function buildEmailFooter() {
  return `
    <div style="padding-top: 18px; text-align: center; background-color: #ffffff !important;">
      <div style="font-size: 13px; line-height: 1.6; color: ${LABEL_COLOR} !important; background-color: #ffffff !important;">
        StartFlow - Simplifying the process of starting your business
      </div>
    </div>
  `;
}

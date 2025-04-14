export function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params;

  const brandColor = theme?.brandColor || "#2563eb";
  const buttonText = theme?.buttonText || "#ffffff";

  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
      <body style="background-color: #f9f9f9;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 45px 30px 60px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #ffffff; border-radius: 5px; box-shadow: 0 3px 6px rgba(0,0,0,0.05);">
          <tr>
            <td align="center">
              <div style="padding-bottom: 30px; border-bottom: 1px solid #eaeaea;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #000;">Sign in to <span style="color: ${brandColor};">${escapedHost}</span></h1>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 0;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333;">Click the button below to sign in to your account.</p>
              <div style="text-align: center;">
                <a href="${url}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: 500; color: ${buttonText}; background-color: ${brandColor}; border-radius: 4px; text-decoration: none; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">Sign in</a>
              </div>
              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.5; color: #666;">If you did not request this email, you can safely ignore it.</p>
              <p style="margin: 10px 0 0; font-size: 14px; line-height: 1.5; color: #666;">This link will expire in 24 hours.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 30px; border-top: 1px solid #eaeaea; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #999;">Powered by ${escapedHost}</p>
            </td>
          </tr>
        </table>
      </body>
    `;
}

export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n\nClick the link below to sign in to your account:\n\n${url}\n\nIf you did not request this email, you can safely ignore it.\n\nThis link will expire in 24 hours.`;
}

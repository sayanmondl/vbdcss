export function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params;
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
    <body style="background-color: #f9f9f9; margin: 0; padding: 0">
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 45px 30px 60px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
        "
      >
        <tr>
          <td align="center">
            <div style="padding-bottom: 20px">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Visva-Bharati_University_Logo.svg/120px-Visva-Bharati_University_Logo.svg.png"
                alt="Visva-Bharati Logo"
                width="80"
                style="margin-bottom: 15px"
              />
              <h2
                style="margin: 0; font-size: 22px; font-weight: 600; color: #000"
              >
                Department of Computer and System Sciences (DCSS)
              </h2>
              <p style="margin: 5px 0 0; font-size: 14px; color: #555">
                Visva-Bharati University
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 0">
            <p
              style="
                margin: 0 0 20px;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              "
            >
              Click the button below to sign in to your account.
            </p>
            <div style="text-align: center">
              <a
                href="${url}"
                target="_blank"
                style="
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 16px;
                  font-weight: 500;
                  color: #ffffff;
                  background-color: #2563eb;
                  border-radius: 8px;
                  text-decoration: none;
                  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
                "
                >Sign in</a
              >
            </div>
            <p
              style="
                margin: 30px 0 0;
                font-size: 14px;
                line-height: 1.5;
                color: #666;
              "
            >
              If you did not request this email, you can safely ignore it.
            </p>
            <p
              style="
                margin: 10px 0 0;
                font-size: 14px;
                line-height: 1.5;
                color: #666;
              "
            >
              This link will expire in 24 hours.
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              padding-top: 30px;
              border-top: 1px solid #eaeaea;
              text-align: center;
            "
          >
            <p style="margin: 0; font-size: 12px; color: #999">
              Powered by ${escapedHost}
            </p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #999">
              Department of Computer and System Sciences, Visva-Bharati University
            </p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #999">
              Santiniketan, West Bengal, India
            </p>
          </td>
        </tr>
      </table>
    </body>
  `;
}

export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n\nClick the link below to sign in to your account:\n\n${url}\n\nIf you did not request this email, you can safely ignore it.\n\nThis link will expire in 24 hours.`;
}

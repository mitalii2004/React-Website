const emailTemplate = (resetUrl) => `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f4f4f4;padding:20px;" id="bodyTable">
  <tbody>
    <tr>
      <td align="center" valign="top" id="bodyCell">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:10px;box-shadow:0px 4px 10px rgba(0,0,0,0.1);">
          <tbody>
            <tr>
              <td style="background-color:#0073e6;padding:20px;border-top-left-radius:10px;border-top-right-radius:10px;text-align:center;">
                <img src="https://email.aumfusion.com/vespro/img/hero-img/blue/logo.png" alt="Logo" width="150" style="display:block;margin:auto;">
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px;">
                <img src="https://email.aumfusion.com/vespro/img/hero-img/blue/heroGradient/user-account.png" alt="Reset Password" width="100%" style="max-width:400px;display:block;margin:auto;">
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px;">
                <h2 style="color:#333;font-family:'Arial',sans-serif;font-size:24px;font-weight:bold;margin-bottom:10px;">Hello Mitali Goura,</h2>
                <p style="color:#666;font-family:'Arial',sans-serif;font-size:16px;margin:0;">We received a request to reset your password. Click the button below to proceed.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px;">
                <a href="${resetUrl}" style="background-color:#0073e6;color:#ffffff;font-family:'Arial',sans-serif;font-size:16px;font-weight:bold;padding:12px 30px;border-radius:30px;text-decoration:none;display:inline-block;">Reset Password</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 10px 20px;">
                <p style="color:#888;font-family:'Arial',sans-serif;font-size:14px;margin:0;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 30px 20px;background-color:#f4f4f4;border-bottom-left-radius:10px;border-bottom-right-radius:10px;">
                <p style="color:#777;font-family:'Arial',sans-serif;font-size:14px;margin:0;">Need help? <a href="#" style="color:#0073e6;text-decoration:none;">Contact Support</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
`;

module.exports = emailTemplate;

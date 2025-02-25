const emailTemplate = `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
  <tbody>
    <tr>
      <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
          <tbody>
            <tr>
              <td align="center" valign="top"></td>
            </tr>
          </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
          <tbody>
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" 
                  style="background-color:#fff;border:1px solid #e5e5e5;border-top:none;">
                  <tbody>
                    <tr>
                      <td style="background-color:#f36f21;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 60px 0 20px;" align="center" class="emailLogo">
                        <a href="#" style="text-decoration:none" target="_blank">
                          <img alt="" border="0" src="/logo.svg" 
                            style="width:100%;max-width:150px;height:auto;display:block" width="150">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 20px;" align="center" class="imgHero">
                        <a href="#" style="text-decoration:none" target="_blank">
                          <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/hero-img/blue/heroGradient/user-account.png" 
                            style="width:100%;max-width:600px;height:auto;display:block;color:#f9f9f9;" width="600">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 20px;" align="center" class="mainTitle">
                        <h2 style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;
                          line-height:36px;text-align:center;margin:0">Hi "John Doe"</h2>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 20px 30px;" align="center" class="subTitle">
                        <h4 style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;
                          line-height:24px;text-align:center;margin:0">Verify Your Email Account</h4>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 20px;" align="center" class="containtTable">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription">
                          <tbody>
                            <tr>
                              <td style="padding-bottom: 20px;" align="center" class="description">
                                <p style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;
                                  line-height:22px;text-align:center;margin:0">Thanks for subscribing to the Vespro newsletter. 
                                  Please click the confirm button to start receiving our emails.</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton">
                          <tbody>
                            <tr>
                              <td style="padding:20px 0" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" align="center">
                                  <tbody>
                                    <tr>
                                      <td style="background-color:#00d2f4;padding:12px 35px;border-radius:50px;" align="center" class="ctaButton">
                                        <a href="#" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;
                                          letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" 
                                          target="_blank">Confirm Email</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:40px;" class="emailRegards">
                        <a href="#" target="_blank" style="text-decoration:none;">
                          <img src="http://email.aumfusion.com/vespro/img/other/signature.png" alt="" width="150" 
                            style="width:100%;max-width:150px;height:auto;display:block;">
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                  <tbody>
                    <tr>
                      <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;

module.exports = emailTemplate;

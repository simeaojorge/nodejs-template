const jwt = require('jsonwebtoken');
require('dotenv').config()
var request = require('request-promise')

exports.generateToken = (string) => {
    if(!string || string == ""){
        return null
    }
    return jwt.sign(string, process.env.jwt_secret, {algorithm: "HS256"})
}

exports.decodeToken = (string) => {
    if(!string || string == ""){
        return null
    }
    return jwt.verify(string, process.env.jwt_secret, {algorithm: "HS256"})
}

exports.isEmptyObject = (obj) => {
    if(!obj){ 
        return true
    }
    
    if(typeof obj === 'undefined'){
        return true
    }

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
        }
    }
    return true;
}

exports.sendResponse = (res, responseObj) => {
    res.status(responseObj.statusCode).send(responseObj.body)
}

exports.sendResponseException = (res, e) => {

    let errorMessage = ""
    let errorType = ""

    if(e.description){
        errorMessage = e.description
    }else if(e.message){
        errorMessage = e.message
    }else if(e.errorMessage){
        errorMessage = e.errorMessage
    }

    if(e.name){
        errorType = e.name
    }else if(e.errorType){
        errorType = e.errorType
    }

    var response = {
        "name": errorType,
        "description": errorMessage,
        "body": e,
    }

    res.status(e.status ? e.status : 500).send(response)
}


exports.emailTemplate = async (title, greeting, body) => { 
  if(!title){
    title = ""
  }
  
  if (!greeting){
    greeting = ""
  }

  if (!body) {
    body = ""
  }

  // var i18nObj = await i18n.initI18n(null)

  let footer_rights = "rights"
  let footer_bottom = "footer_bottom"

  let html_body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
    '<!-- saved from url=(0058)file:///Users/easywork/Documents/YOOU/Email%20Template.htm -->'+
    '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
      '<!--[if gte mso 9]>'+
      '<xml>'+
        '<o:OfficeDocumentSettings>'+
        '<o:AllowPNG/>'+
        '<o:PixelsPerInch>96</o:PixelsPerInch>'+
        '</o:OfficeDocumentSettings>'+
      '</xml>'+
      '<![endif]-->'+
      
      '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">'+
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
      '<meta name="format-detection" content="date=no">'+
      '<meta name="format-detection" content="address=no">'+
      '<meta name="format-detection" content="telephone=no">'+
      '<meta name="x-apple-disable-message-reformatting">'+
        '<!--[if !mso]><!-->'+
        '<link href="https://yoou.com/email_template/css" rel="stylesheet">'+
        '<!--<![endif]-->'+
      '<title>'+ title +'</title>'+
      '<!--[if gte mso 9]>'+
      '<style type="text/css" media="all">'+
        'sup { font-size: 100% !important; }'+
      '</style>'+
      '<![endif]-->'+
      

      '<style type="text/css" media="screen">'+
        '/* Linked Styles */'+
        'body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none }'+
'          a { color:#d85d5c; text-decoration:none }'+
        'p { padding:0 !important; margin:0 !important } '+
        'img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }'+
        '.mcnPreviewText { display: none !important; }'+
        
        '/* Mobile styles */'+
        '@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {'+
          '.mobile-shell { width: 100% !important; min-width: 100% !important; }'+
          
          '.m-center { text-align: center !important; }'+
          '.m-left { text-align: left !important; }'+
          
          '.center { margin: 0 auto !important; }'+
          '.left { margin-right: auto !important; }'+
          
          '.td { width: 100% !important; min-width: 100% !important; }'+

          '.m-br-5 { height: 5px !important; }'+
          '.m-br-10 { height: 10px !important; }'+
          '.m-br-15 { height: 15px !important; }'+
          '.m-br-30 { height: 30px !important; }'+

          '.m-td,'+
          '.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }'+

          '.m-block { display: block !important; }'+

          '.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }'+

          '.column-top,'+
          '.column { float: left !important; width: 100% !important; display: block !important; }'+

          '.content-spacing { width: 15px !important; }'+

          '.m-bg { display: block !important; width: 100% !important; height: auto !important; background-position: center center !important; }'+

          '.h-auto { height: auto !important; }'+

          '.ptb-0 { padding-top: 0px !important; padding-bottom: 0px !important; }'+
          '.ptb-15 { padding-top: 15px !important; padding-bottom: 15px !important; }'+
          '.ptb-25 { padding-top: 25px !important; padding-bottom: 25px !important; }'+
          '.plr-5 { padding-left: 5px !important; padding-right: 5px !important; }'+
          '.plr-15 { padding-left: 15px !important; padding-right: 15px !important; }'+
          '.plr-0 { padding-left: 0px !important; padding-right: 0px !important; }'+
          '.pb-25 { padding-bottom: 25px !important; }'+
          '.pt-25 { padding-top: 25px !important; }'+

          '.p-25-15 { padding: 25px 15px !important; }'+
        '}'+
      '</style>'+
    '</head>'+
    '<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none;">'+
      '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">'+
        '<tbody><tr>'+
          '<td align="center" valign="top">  '+
            '<!-- Header -->'+
            '<div style="width: 100%;">'+
              '<img src="https://yoou.com/images/logo_blue.png" style="max-width: 250px;margin: 0 auto;display: block;padding: 15px;">'+
            '</div>'+
            '<!-- END Header -->'+

            '<!-- Main -->'+
            '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
              '<tbody><tr>'+
                '<td>'+
                  '<repeater>'+
                    '<layout label="Section 1">'+
                      '<!-- Section 1 -->							'+
                      '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#313941">'+
                        '<tbody><tr>'+
                          '<td valign="top" class="m-td" style="line-height:0pt; text-align:left;">'+
                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                              '<tbody><tr>'+
                                '<td class="img" height="30" bgcolor="#ffffff" style="line-height:0pt; text-align:left;">&nbsp;</td>'+
                              '</tr>'+
                            '</tbody></table>'+
                          '</td>'+
                          '<td align="center" valign="top" width="650" class="mobile-shell">'+
                            '<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">'+
                              '<tbody><tr>'+
                                '<td class="td" style="width:650px; min-width:650px; line-height:0pt; padding:0; margin:0; font-weight:normal;">'+
                                  '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                    '<tbody><tr>'+
                                      '<td class="fluid-img" style="line-height:0pt; text-align:left;"><a href="file:///Users/easywork/Downloads/e-nthusiastic-free-html-email-template/campaignmonitor/e-nthusiastic-campaignmonitor.html#" target="_blank"></a></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                      '<td class="h1-1-white centered p-20-15" style="padding: 30px; color:#ffffff; font-size:30px; line-height:52px; text-align:center;" bgcolor="#3A7ECE">'+
                                        '<multiline>'+
                                          title +'</multiline>'+
                                      '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                      '<td class="p-25-15" style="padding: 10px 30px 50px 30px;">'+
                                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                          '<tbody><tr>'+
                                            
                                          '</tr>'+
                                          '<tr>'+
                                            
                                          '</tr>'+
                                        '</tbody></table>'+
                                      '</td>'+
                                    '</tr>'+
                                  '</tbody></table>'+
                                '</td>'+
                              '</tr>'+
                            '</tbody></table>'+
                          '</td>'+
                          '<td valign="top" class="m-td" style="line-height:0pt; text-align:left;">'+
                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                              '<tbody><tr>'+
                                '<td class="img" height="30" bgcolor="#ffffff" style="line-height:0pt; text-align:left;">&nbsp;</td>'+
                              '</tr>'+
                            '</tbody></table>'+
                          '</td>'+
                        '</tr>'+
                      '</tbody></table>'+
                      '<!-- END Section 1 -->'+
                    '</layout>'+

                    '<layout label="Section 2">'+
                      '<!-- Section 2 -->'+
                      '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                        '<tbody><tr>'+
                          '<td align="center" valign="top">'+
                            '<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">'+
                              '<tbody><tr>'+
                                '<td class="td" style="width:650px; min-width:650px;line-height:0pt; padding:0; margin:0; font-weight:normal;">'+
                                  '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                    '<tbody><tr>'+
                                      '<td class="ptb-25" style="padding: 50px 0 30px 0;"> '+
                                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                          '<!-- Section Head -->'+
                                          '<tbody><tr>'+
                                            
                                          '</tr>'+
                                          '<!-- END Section Head -->'+

                                          '<!-- Article - Image Right -->'+
                                          '<tr>'+
                                            '<td class="pb-25" style="padding-bottom: 50px;">'+
                                              '<table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">'+
                                                '<tbody><tr>'+
                                                  
                                                  '<th class="column-top" valign="top" dir="ltr" width="30" style="line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>'+
                                                  '<th class="column-top" valign="top" dir="ltr" style="line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">'+
                                                    '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                                      '<tbody><tr>'+
                                                        '<td class="plr-15">'+
                                                          '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                                            '<tbody><tr>'+
                                                              '<td class="text-6" style="padding: 15px 0; color:#1d2025; font-size:28px; line-height:36px; text-align:left;">'+
                                                                '<multiline>'+ greeting +'</multiline>'+
                                                              '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                              
                                                            '</tr>'+
                                                            '<tr>'+
                                                              '<td class="text" style="padding-bottom: 15px; color:#1d2025; font-size:14px; line-height:24px; text-align:left;">'+
                                                                '<multiline>'+ body +'</multiline>'+
                                                              '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                              
                                                            '</tr>'+
                                                            '<tr>'+
                                                              
                                                            '</tr>'+
                                                          '</tbody></table>'+
                                                        '</td>'+
                                                      '</tr>'+
                                                    '</tbody></table>'+
                                                  '</th>'+
                                                '</tr>'+
                                              '</tbody></table>'+
                                            '</td>'+
                                          '</tr>'+
                                          '<tr>'+
                                            
                                          '</tr>'+
                                          '<!-- END Article - Image Right -->'+

                                          '<!-- Article - Image Left -->'+
                                          '<tr>'+
                                            '<td class="pb-25" style="padding-bottom: 0px;">'+
                                              '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                                '<tbody><tr>'+
                                                  
                                                  
                                                  
                                                '</tr>'+
                                              '</tbody></table>'+
                                            '</td>'+
                                          '</tr>'+
                                          '<tr>'+
                                            '<td class="plr-15 pb-25" style="padding-bottom: 50px;">'+
                                              '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                                '<tbody><tr>'+
                                                  '<td class="img" height="1" bgcolor="#ecebeb" style="line-height:0pt; text-align:left;">&nbsp;</td>'+
                                                '</tr>'+
                                              '</tbody></table>'+
                                            '</td>'+
                                          '</tr>'+
                                          '<!-- END Article - Image Left -->'+
                                        '</tbody></table>'+
                                      '</td>'+
                                    '</tr>'+
                                  '</tbody></table>'+
                                '</td>'+
                              '</tr>'+
                            '</tbody></table>'+
                          '</td>'+
                        '</tr>'+
                      '</tbody></table>'+
                      '<!-- END Section 2 -->'+
                    '</layout>'+

                    '<layout label="Section 3">'+
                      '<!-- Section 3 -->'+
                      '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed">'+
                        '<tbody><tr>'+
                          
                        '</tr>'+
                      '</tbody></table>'+
                      '<!-- END Section 3 -->'+
                    '</layout>'+

                    '<layout label="Section 4">'+
                      '<!-- Section 4 -->							'+
                      '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#d85d5c">'+
                        '<tbody><tr>'+
                          
                        '</tr>'+
                      '</tbody></table>'+
                      '<!-- END Section 4 -->'+
                    '</layout>'+

                    '<layout label="Section 5">'+
                      '<!-- Section 5 -->							'+
                      '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                        '<tbody><tr>'+
                          
                        '</tr>'+
                      '</tbody></table>'+
                      '<!-- END Section 5 -->'+
                    '</layout>'+
                  '</repeater>'+
                '</td>'+
              '</tr>'+
            '</tbody></table>'+
            '<!-- END Main -->'+

            '<!-- Footer -->'+
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#313941">'+
              '<tbody><tr>'+
                '<td align="center" valign="top">'+
                  '<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">'+
                    '<tbody><tr>'+
                      '<td class="td" style="width:650px; min-width:650px; line-height:0pt; padding:0; margin:0; font-weight:normal;">'+
                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                          '<tbody><tr>'+
                            '<td class="p-25-15" style="padding: 45px 30px;" bgcolor="#313941">'+
                              '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                '<tbody><tr>'+
                                  '<th class="column-top" valign="top" width="290" style="line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">'+
                                    '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                      '<tbody><tr>'+
                                        '<td class="img m-center" style="padding-bottom: 15px; line-height:0pt; text-align:left;"><a href="file:///Users/easywork/Downloads/e-nthusiastic-free-html-email-template/campaignmonitor/e-nthusiastic-campaignmonitor.html#" target="_blank"><img src="https://yoou.com/email_template/logo_1.png" width="100" height="40" editable="true" border="0" alt=""></a></td>'+
                                      '</tr>'+
                                      '<tr>'+
                                        '<td class="text-footer m-center" style="color:#97999b; font-size:12px; line-height:24px; text-align:left;">'+
                                          '<multiline>'+ footer_rights +'</multiline>'+
                                        '</td>'+
                                      '</tr>'+
                                    '</tbody></table>'+
                                  '</th>'+
                                  '<th class="column-top" valign="top" width="10" style="line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"><div style="line-height:0pt;" class="m-br-15"></div>'+
                                  '</th>'+
                                  
                                '</tr>'+
                              '</tbody></table>'+
                            '</td>'+
                          '</tr>'+
                        '</tbody></table>'+
                      '</td>'+
                    '</tr>'+
                  '</tbody></table>'+
                '</td>'+
              '</tr>'+
            '</tbody></table>'+
            '<!-- END Footer -->'+

            '<!-- Bottom -->'+
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#2a3138">'+
              '<tbody><tr>'+
                '<td align="center" valign="top">'+
                  '<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">'+
                    '<tbody><tr>'+
                      '<td class="td" style="width:650px; min-width:650px; line-height:0pt; padding:0; margin:0; font-weight:normal;">'+
                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                          '<tbody><tr>'+
                            '<td class="text-bottom centered plr-15" style="padding: 20px 30px; color:#898989; font-size:12px; line-height:24px; text-align:center;">'+
                                footer_bottom +'<br><preferences class="link-3-u" style="color:#c5c5c5; text-decoration:underline;"></preferences></td>'+
                          '</tr>'+
                        '</tbody></table>'+
                      '</td>'+
                    '</tr>'+
                  '</tbody></table>'+
                '</td>'+
              '</tr>'+
            '</tbody></table>'+
            '<!-- END Bottom -->'+
          '</td>'+
        '</tr>'+
      '</tbody></table>'+
    '</body></html>'

  return html_body
}
import {EmailService} from "./email-service";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function generateHTMLForInvitationEmail(email: string) {
    return `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        @media (max-width: 570px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .row-content {
                width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>
<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<h1 style="display: none;">Invitation to Reshrd</h1>
<p>
lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quibusdam. 

</p>
<a href="${baseUrl}/register?email=${email}">Create account</a>

</body>
</html>
   `

}

const emailService = new EmailService(
    process.env.NEXT_PUBLIC_RESHRD_EMAIL!,
    process.env.NEXT_PUBLIC_RESHRD_EMAIL_PASSWORD!
);

export const sendInvitationEmail = async (email: string) => {

    const emailConfig = {
        from: process.env.NEXT_PUBLIC_RESHRD_EMAIL!,
        to: email,
        subject: 'Invitation to Reshrd',
        html: generateHTMLForInvitationEmail(email)
    };

    await emailService.send(emailConfig);


}
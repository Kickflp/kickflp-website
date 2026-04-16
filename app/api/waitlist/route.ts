import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = '3a46083a-22c0-4cc7-8705-30a31d43eae5';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 1. Add to Resend audience
    await resend.contacts.create({
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    // 2. Send confirmation email to the user
    await resend.emails.send({
      from: 'KICKFLP <sendit@kickflp.com>',
      to: email,
      subject: "You're on the KICKFLP waitlist 🤙",
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="background:#000000;margin:0;padding:0;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#000000;border-radius:12px;padding:40px;">
                    <tr>
                      <td align="center" style="padding-bottom:24px;">
                        <img src="https://kickflp-dev-73507449dc98.herokuapp.com/kf_logo.png" alt="KICKFLP" width="180" style="display:block;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:8px;">
                        <p style="color:#A8F0DD;font-size:14px;font-weight:600;letter-spacing:2px;margin:0;">YOU'RE ON THE LIST</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:24px;">
                        <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0;">Welcome, ${name}! 🤙</h1>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:32px;">
                        <p style="color:#cccccc;font-size:16px;line-height:1.6;margin:0;">
                          You're officially on the KICKFLP waitlist.<br>
                          We're building the world's best action sports streaming platform<br>
                          and you'll be one of the first to know when we launch.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:32px;">
                        <p style="color:#A8F0DD;font-size:16px;font-weight:600;margin:0;">
                          Skateboarding. Surfing. BMX. Motocross. And more.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:40px;">
                        <img src="https://kickflp-dev-73507449dc98.herokuapp.com/astro.png" alt="KICKFLP Astronaut" width="80" style="display:block;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <p style="color:#666666;font-size:12px;margin:0;">
                          © 2026 KICKFLP. All Rights Reserved.<br>Huntington Beach, CA
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    // 3. Send notification email to you
    await resend.emails.send({
      from: 'KICKFLP <sendit@kickflp.com>',
      to: 'sendit@kickflp.com',
      subject: `🤙 New waitlist signup: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="background:#000000;margin:0;padding:0;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#000000;border-radius:12px;padding:40px;">
                    <tr>
                      <td align="center" style="padding-bottom:24px;">
                        <img src="https://kickflp-dev-73507449dc98.herokuapp.com/kf_logo.png" alt="KICKFLP" width="180" style="display:block;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:24px;">
                        <p style="color:#A8F0DD;font-size:14px;font-weight:600;letter-spacing:2px;margin:0;">NEW WAITLIST SIGNUP</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:8px;">
                        <p style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">${name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:32px;">
                        <p style="color:#A8F0DD;font-size:16px;margin:0;">${email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom:40px;">
                        <img src="https://kickflp-dev-73507449dc98.herokuapp.com/astro.png" alt="KICKFLP Astronaut" width="60" style="display:block;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <p style="color:#666666;font-size:12px;margin:0;">© 2026 KICKFLP. All Rights Reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const formData = await request.formData();
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !message) {
        return new Response('Missing required fields', { status: 400 });
      }

      // Send email using MailChannels
      const sendRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: env.RECEIVER_EMAIL }],
            },
          ],
          from: {
            email: env.SENDER_EMAIL,
            name: 'Contact Form',
          },
          subject: 'New Contact Form Submission',
          content: [
            {
              type: 'text/plain',
              value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            },
          ],
        }),
      });

      try {
        const response = await fetch(sendRequest);
        if (response.status === 202) {
          return new Response('Message sent successfully', { status: 200 });
        } else {
          return new Response('Failed to send message', { status: 500 });
        }
      } catch (error) {
        return new Response('Error sending message', { status: 500 });
      }
    }

    return new Response('Method not allowed', { status: 405 });
  }
};

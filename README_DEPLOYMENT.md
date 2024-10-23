# Deployment Instructions

This guide will help you deploy the contact form application to Cloudflare Pages and set up the Cloudflare Worker with AWS API Gateway and SES.

## Prerequisites

1. Cloudflare account
2. Wrangler CLI installed (`npm install -g wrangler`)
3. AWS account with API Gateway and SES set up

## Local Development Setup

1. Copy the `.env.example` file to `.env`:   ```
   cp .env.example .env   ```
2. Fill in the values in the `.env` file with your actual email addresses and API endpoint.

## Deploying to Cloudflare Pages

1. Log in to your Cloudflare account and go to the Pages section.
2. Click on "Create a project" and connect your GitHub repository.
3. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `.output/public`
4. Add the following environment variables:
   - NUXT_RECEIVER_EMAIL: Your receiver email address
   - NUXT_SENDER_EMAIL: Your sender email address
   - NUXT_API_ENDPOINT: The URL of your Cloudflare Worker (e.g., https://contact-form-worker.your-domain.workers.dev)
5. Deploy the site.

## Deploying the Cloudflare Worker

1. Update the `wrangler.toml` file with your account ID and zone ID (if using a custom domain).
2. Log in to Wrangler: `wrangler login`
3. Deploy the worker: `wrangler publish`
4. Set the environment variables for the worker:   ```
   wrangler secret put RECEIVER_EMAIL
   wrangler secret put SENDER_EMAIL
   wrangler secret put AWS_API_GATEWAY_ENDPOINT
   ```
   Enter the corresponding values when prompted.

## Configuring AWS API Gateway and SES

1. Set up AWS SES:
   - Verify your sender email address in SES.
   - If your account is in sandbox mode, also verify the receiver email address.

2. Create an AWS API Gateway:
   - Create a new REST API.
   - Create a POST method for the root resource ("/").
   - Set the integration type to "AWS Service".
   - Choose "SES" as the AWS Service.
   - Set the AWS Region where your SES is configured.
   - Set HTTP method to POST.
   - Set Action Type to "Use action name".
   - Set Action to "SendEmail".
   - Set Execution role to a role that has permissions to send emails via SES.

3. Deploy the API Gateway:
   - Create a new stage (e.g., "prod") and deploy the API.
   - Note the invoke URL of your API Gateway.

4. Update the `AWS_API_GATEWAY_ENDPOINT` in your Cloudflare Worker configuration with the API Gateway invoke URL.

## Testing

1. Visit your deployed Cloudflare Pages site.
2. Fill out the contact form and submit it.
3. Verify that the email is sent successfully via AWS SES.

## Troubleshooting

- If the form submission fails, check the Cloudflare Worker logs for any errors.
- Ensure that the AWS API Gateway endpoint is correctly configured and accessible.
- Verify that AWS SES is properly set up and the sender email is verified.
- Check AWS CloudWatch logs for any API Gateway or SES errors.

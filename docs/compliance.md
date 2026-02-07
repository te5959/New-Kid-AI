# Security & Compliance (GDPR / COPPA)

## Data Minimization
- Collect only parent email, password hash, and child display name + age.
- No precise location, device IDs, or advertising identifiers.
- No third-party trackers or ads.

## Parental Consent Flow
1. Parent registers account and accepts consent statement.
2. Child profiles are created only by parent.
3. Parent can delete child data at any time.

## Safety Controls
- No free-text AI prompts.
- Only predefined datasets and responses.
- Content review pipeline for lessons.

## Security Controls
- Password hashing using bcrypt.
- JWT access + refresh tokens.
- Rate limiting and request validation.
- SQL parameterization to prevent injection.
- Strict CORS for approved origins.

## COPPA Notes
- Provide clear privacy policy.
- Allow parents to review and delete data.
- Use neutral analytics (aggregated only).

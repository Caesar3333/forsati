# Marketplace Flows

Forsati includes a provider marketplace (interview coaches, resume reviewers, training providers).

## Provider onboarding
1) Provider registers and creates a profile.
2) Status becomes `pending`.
3) Provider uploads verification documents.
4) Admin reviews and sets status to `approved` or `rejected`.
5) Approved providers can publish services.

## Service lifecycle
- Draft → Submitted → Published → Paused/Archived
- Providers manage pricing, availability, and deliverables.
- Admin can suspend services or providers if needed.

## Orders and delivery
1) User places an order.
2) Provider accepts and delivers the service.
3) Order status progresses: `new` → `in_progress` → `delivered` → `completed`.
4) Users can request revisions within policy.

## Payouts
- Provider earnings accumulate in a payout balance.
- Payout requests move through `requested` → `approved` → `paid`.
- Admin can pause payouts on dispute or compliance issues.

## Disputes
- Users can open a dispute within a defined window.
- Support reviews messages, files, and history.
- Outcome: refund, partial refund, or release of funds.

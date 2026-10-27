---
name: create-jira-ticket
description: >-
  Drafts Jira tickets using this project's title and description conventions,
  then creates approved tickets through the installed Jira MCP. Use only when
  explicitly invoked to prepare or create Jira tickets.
disable-model-invocation: true
---

# Create Jira ticket

## Conventions

- Use a concise, action-led title with only the first character uppercase and all remaining characters lowercase.
- Use plain English and keep the ticket focused on the requested outcome.
- Write the description with these exact headings, in order: `Goal`, `Scope`, `Acceptance criteria`.
- Goal: a short paragraph explaining the intended outcome and why it matters.
- Scope: a short paragraph or bullets describing the work included.
- Acceptance criteria: bullets describing observable, verifiable outcomes.
- Where a scope boundary needs clarification, add a closing sentence after the acceptance criteria stating what is excluded. Omit it otherwise.
- Do not invent requirements, implementation details, deadlines, or field values. Ask about missing information when it materially affects the ticket.

## Defaults

- Jira site: `https://belallmuhammad0.atlassian.net`.
- Project: `EO` (Ecommerce Operations).
- Issue type: `Task`.
- Use another site, project, or issue type when the user requests it.
- Leave optional fields to Jira unless the user requests them, including priority, assignee, labels, parent, sprint, and dates. Do not copy these values or workflow status from example tickets.
- Reference tickets for writing style: [EO-1](https://belallmuhammad0.atlassian.net/browse/EO-1), [EO-2](https://belallmuhammad0.atlassian.net/browse/EO-2), [EO-3](https://belallmuhammad0.atlassian.net/browse/EO-3). The conventions above are sufficient for normal use; read the examples through the Jira MCP only when needed.

## Workflow

1. Understand the requested work from the conversation and relevant project context. Clarify important ambiguities before finalizing the draft.
2. Use the installed Jira MCP. Follow its current tool schemas; do not install another integration or use browser automation or direct HTTP calls as a substitute.
3. Before Jira calls, obtain accessible Atlassian resources once per session and reuse the matching site's cloud ID explicitly. Do not guess a cloud ID. Use the MCP's discovery tool only for operations not already exposed, such as checking required project fields when necessary.
4. Prepare a complete draft showing the target site, project, issue type, title, full description, and any explicitly requested optional fields.
5. **Always show the completed draft and wait for the user's explicit approval before creating the ticket.** Invoking this skill or asking for a ticket does not approve an unseen draft. If the user requests changes, show the revised draft and wait for approval again.
6. After approval, call the Jira MCP's issue creation tool with the approved content. Map the title to `summary`, use `projectKey` and `issueType`, and send the description as Markdown using the template below. Do not add unapproved content or optional fields.
7. Check the creation response. Report the created ticket key and link only when creation is confirmed. If creation fails, explain the error; if repairing it changes the approved draft or fields, obtain approval again. If creation may have succeeded despite an error, verify before retrying to avoid duplicates. A returned issue key with a failed follow-up operation does not justify creating the issue again.

## Description template

```markdown
## Goal

[Short outcome and purpose.]

## Scope

- [Included work.]

## Acceptance criteria

- [Verifiable outcome.]

[Optional sentence stating the scope boundary. Remove when unnecessary.]
```

## Example draft

Site: `https://belallmuhammad0.atlassian.net`
Project: `EO`
Issue type: `Task`
Title: **Add order filtering**

```markdown
## Goal

Help users find relevant orders by filtering the order list by status and date.

## Scope

- Add order status and date filters to the order list.
- Allow users to clear the filters and return to the unfiltered list.

## Acceptance criteria

- Users can filter orders by status and date, individually or together.
- The list shows only orders matching the selected filters.
- Clearing the filters restores the unfiltered list.

This ticket covers filtering by order status and date; sorting and exporting orders are outside its scope.
```

This example assumes the user requested status and date filters with a clear action. Do not carry its requirements into unrelated tickets. After showing a draft, ask for approval and wait; do not call the creation tool yet.

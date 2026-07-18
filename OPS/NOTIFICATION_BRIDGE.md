# Notification Bridge

Goal: turn a chat decision into a real notification for Keymon without needing direct iMessage access from Codex.

Primary route:
1. Write the chat outcome into Claudex.
2. Commit and push the change.
3. Run the `Keymon ping inbox` GitHub Action with a short subject and message.
4. The action opens or comments on the dedicated inbox issue and mentions Keymon's GitHub login so GitHub notifies him.

Known limits:
- Codex in this session does not expose a direct iMessage tool.
- GitHub issue notifications are the reliable bridge available from this repo.
- If Keymon wants a true iMessage path, that still depends on his Mac side connector setup.

Use this for fast chat driven nudges, not for secrets or high risk approvals.

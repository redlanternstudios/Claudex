# Claudex Boot Pointer

Read `.claudex.json`.

Resolve `local_bridge_path` first.

If that path is unavailable, locate or clone `bridge_repo` at `bridge_ref`, then read `bridge_file`.

Read the bridge and protocol before product instructions.

Read `qa_protocol_file` and `questions_index_file` when the product needs to ask or answer a cross-system question.

If the bridge cannot be read or the product key is unknown, report `SYNC RED` and stop continuation.

Never create product local bridge state.

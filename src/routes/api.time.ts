import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
export const Route = createFileRoute("/api/time")({
	server: {
		handlers: {
			GET: () => json({ time: new Date().toISOString() }),
		},
	},
});

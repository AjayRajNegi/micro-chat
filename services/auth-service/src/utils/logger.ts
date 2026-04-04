import { createLogger } from "@micro-chat/common";
import type { Logger } from "@micro-chat/common";

export const logger: Logger = createLogger({ name: "auth-service" });

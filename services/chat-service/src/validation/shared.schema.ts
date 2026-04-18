import { z } from '@micro-chat/common';

export const conversationIdParamsSchema = z.object({
  id: z.string().uuid(),
});

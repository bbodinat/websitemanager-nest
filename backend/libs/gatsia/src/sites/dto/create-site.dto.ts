import { z } from 'zod';

export const CreateSiteSchema = z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string().nullable(),
});

export type CreateSiteDto = z.infer<typeof CreateSiteSchema>;

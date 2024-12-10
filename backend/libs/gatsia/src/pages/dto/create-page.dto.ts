import { z } from 'zod';
import { Site } from '@gatsia/gatsia/sites/entities/site.entity';

export const CreatePageSchema = z.object({
    name: z.string(),
    site: z.instanceof(Site)
});

export type CreatePageDto = z.infer<typeof CreatePageSchema>;

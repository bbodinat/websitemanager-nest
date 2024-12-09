import { Layout } from '@gatsia/gatsia/layouts/entities/layout.entity';
import { Page } from '@gatsia/gatsia/pages/entities/page.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('sites')
export class Site {

    @Column({ type: 'int', primary: true, generated: true })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'json', nullable: true })
    languages: any;

    @Column({ type: 'text', nullable: true })
    goal: string;

    @Column({ type: 'text', nullable: true })
    targetAudience: string;

    @Column({ type: 'text', nullable: true })
    deckGoal: string;

    @Column({ type: 'text', nullable: true })
    deckTargetAudience: string;

    @Column({ type: 'text', nullable: true })
    deckContext: string;

    @Column({ type: 'float', nullable: true })
    subscriptionPrice: number;

    @Column({ type: 'varchar', nullable: true })
    customerFirstName: string;

    @Column({ type: 'text', nullable: true })
    deckMail: string;

    @OneToMany(() => Page, page => page.site)
    pages: Page[];

    // @OneToMany(() => VectorDocument, vectorDocument => vectorDocument.site)
    // vectorDocuments: VectorDocument[];

    @OneToMany(() => Layout, layout => layout.site)
    layouts: Layout[];

    // @OneToMany(() => Sprint, sprint => sprint.site)
    // sprints: Sprint[];

    @Column({ type: 'varchar', nullable: true })
    wpSite: string;
}
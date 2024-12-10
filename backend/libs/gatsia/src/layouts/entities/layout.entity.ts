import { Page } from '@gatsia/gatsia/pages/entities/page.entity';
import { Site } from '@gatsia/gatsia/sites/entities/site.entity';
import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('layouts')
export class Layout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    goal: string;

    @Column({ type: 'float', default: 0, nullable: false })
    creationDuration: number;

    @Column({ type: 'float', default: 0, nullable: false })
    designDuration: number;

    @Column({ type: 'float', default: 0, nullable: false })
    dataEntryDuration: number;

    @Column({ type: 'float', default: 0, nullable: false })
    developmentDuration: number;

    @Column({ type: 'float', default: 0, nullable: false })
    copywritingDuration: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    color: string;

    @ManyToOne(() => Site, site => site.layouts)
    site: Site;

    @OneToMany(() => Page, page => page.layout)
    pages: Page[];

    @Column({ type: 'json', nullable: true })
    blocks: any;
}
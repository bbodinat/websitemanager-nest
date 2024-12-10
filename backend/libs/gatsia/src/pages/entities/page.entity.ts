import { Layout } from '@gatsia/gatsia/layouts/entities/layout.entity';
import { Site } from '@gatsia/gatsia/sites/entities/site.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'text', name: 'sections', nullable: true })
  sections: string;

  @ManyToOne(() => Site, (site) => site.pages, { onDelete: 'CASCADE' })
  site: Site;

  @ManyToOne(() => Layout, (layout) => layout.pages)
  layout: Layout;

  // @ManyToOne(() => Sprint, sprint => sprint.pages, { nullable: true })
  // sprint: Spin;

  @ManyToOne(() => Page, (parent) => parent.childrens)
  parent: Page;

  @OneToMany(() => Page, (page) => page.parent)
  childrens: Page[];

  @Column({ type: 'integer', name: 'order', nullable: true, default: 0 })
  order: number;

  @Column({ type: 'json', nullable: true })
  blocks: any;

  @Column({ type: 'text', name: 'markdown', nullable: true })
  markdown: string;

  @Column({ type: 'integer', nullable: true })
  wpPostId: number;
}

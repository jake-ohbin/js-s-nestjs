import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
@Unique(['userId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: string;
  @Column()
  hashedPassword: string;
  @Column()
  salt: string;
  @OneToMany(() => Movie, (movie) => movie.user, {
    cascade: ['update', 'remove'],
    // default가 true, 즉 primary - foreign관계 설정된 cloumn에 상호 참조되지 않는 값은 삽입할 수 없다는 조건.
    // 참조무결성을 해할 우려가 있는 동작 자체를 막는 기능도 있음. 예를 들어 고아 항목이 발생할 가능성이 있다면 부모항목 삭제가 불가능해짐.
    createForeignKeyConstraints: true,
  })
  movies: Movie[];
  @CreateDateColumn()
  registeredAt: Date;
}
// cascade 추가하기

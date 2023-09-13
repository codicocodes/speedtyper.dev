import { InjectRepository } from '@nestjs/typeorm';
import { Command, CommandRunner } from 'nest-commander';
import { Repository } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';
import { getFormattedText } from '../services/parser.service';

@Command({
  name: 'reformat-challenges',
  arguments: '',
  options: {},
})
export class ReformatChallengesRunner extends CommandRunner {
  constructor(
    @InjectRepository(Challenge)
    private repository: Repository<Challenge>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const stream = await this.repository
      .createQueryBuilder('ch')
      .select('id, content')
      .stream();

    const pendingUpdates = [];
    for await (const { id, content } of stream) {
      if (id !== '77a954ea-ea04-4d12-b86e-fce128b6941f') {
        continue;
      }
      const formattedContent = getFormattedText(content);
      if (formattedContent !== content) {
        pendingUpdates.push(
          this.repository.update({ id }, { content: formattedContent }),
        );
      }
    }

    await Promise.all(pendingUpdates);

    console.log(`Reformatted ${pendingUpdates.length} challenges`);
  }
}

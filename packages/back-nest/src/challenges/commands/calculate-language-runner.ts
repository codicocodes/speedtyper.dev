import { InjectRepository } from '@nestjs/typeorm';
import { Command, CommandRunner } from 'nest-commander';
import { Repository } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';

@Command({
  name: 'calculate-language',
  arguments: '',
  options: {},
})
export class CalculateLanguageRunner extends CommandRunner {
  constructor(
    @InjectRepository(Challenge)
    private repository: Repository<Challenge>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const stream = await this.repository
      .createQueryBuilder('ch')
      .select('id, path')
      .where('ch.language IS NULL')
      .stream();

    const updatesByLanguage: Record<string, string[]> = {};

    for await (const { id, path } of stream) {
      const dotSplitted = path.split('.');
      const language = dotSplitted[dotSplitted.length - 1];
      if (!updatesByLanguage[language]) {
        updatesByLanguage[language] = [];
      }
      updatesByLanguage[language].push(id);
    }

    await Promise.all(
      Object.entries(updatesByLanguage).map(async ([language, ids]) => {
        await this.repository.update(ids, { language });
      }),
    );
  }
}

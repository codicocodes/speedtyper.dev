import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function runCommand() {
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

runCommand();

import { ProjectConfig } from '../../types/project-config';
import { TestCommandsProvider } from '../../types/test-command-provider';

export class TsNestInfoProvider implements TestCommandsProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getTestCommands(): string[] {
    return [
      'npm install',
      'npm run test',
    ];
  }
}
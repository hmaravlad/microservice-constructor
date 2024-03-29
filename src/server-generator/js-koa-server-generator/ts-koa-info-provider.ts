import { ProjectConfig } from '../../types/config/project-config';
import { TestCommandsProvider } from '../../types/test-command-provider';

export class TsKoaInfoProvider implements TestCommandsProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getTestCommands(): string[] {
    return [
      'npm install',
      'npm run test -- --passWithNoTests',
    ];
  }
}
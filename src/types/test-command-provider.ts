export interface TestCommandsProvider {
  getTestCommands(): string[];
}

export function isTestCommandsProvider(obj: unknown): obj is TestCommandsProvider{
  return (obj as TestCommandsProvider).getTestCommands !== undefined;
}


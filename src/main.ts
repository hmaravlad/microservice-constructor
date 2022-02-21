import { readFileSync } from 'fs';
import { parse } from 'ts-command-line-args';
import { IArgs, argsConfig } from './types/command-line-args';
import { ProjectConfig } from './types/project-config';

(async () => {
  const args = parse<IArgs>(argsConfig);
  const data = readFileSync(args.source).toString();
  const config: ProjectConfig = JSON.parse(data);
  console.dir({ config }, { depth: 3 });
})();

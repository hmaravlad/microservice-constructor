import { readFileSync } from 'fs';
import { parse } from 'ts-command-line-args';
import { generateProject } from './project-generator';
import { IArgs, argsConfig } from './types/command-line-args';
import { ProjectConfig } from './types/project-config';
import { FileWriter } from './writer';

(async () => {
  const args = parse<IArgs>(argsConfig);
  const data = readFileSync(args.source).toString();
  const config: ProjectConfig = JSON.parse(data);
  const files = await generateProject(config);
  const writer = new FileWriter(args.target);
  await writer.writeFiles(files);
  //console.dir({ config }, { depth: 3 });
})();

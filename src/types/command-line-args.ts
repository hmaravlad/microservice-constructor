import { ArgumentConfig } from 'ts-command-line-args';

export interface IArgs {
  source: string,
  target: string,
}

export const argsConfig: ArgumentConfig<IArgs> = {
  source: String,
  target: String,
};
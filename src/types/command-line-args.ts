import { ArgumentConfig } from 'ts-command-line-args';

export interface IArgs {
  source: string,
}

export const argsConfig: ArgumentConfig<IArgs> = {
  source: String,
};
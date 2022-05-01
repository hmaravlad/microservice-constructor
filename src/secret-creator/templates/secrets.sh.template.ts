import { Secret } from '../../types/secret';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';

export class SecretsShTemplate implements FileTemplate<Secret[]> {
  getFile(secrets: Secret[]): File {
    return {
      name: 'secrets.sh',
      path: '/',
      data: secrets.map(secret => `${secret.name}=${secret.value}`).join('\n'),
    };
  }
}


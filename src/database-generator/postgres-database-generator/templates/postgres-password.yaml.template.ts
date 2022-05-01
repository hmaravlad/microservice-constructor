import { Database } from 'src/types/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresPasswordTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    return {
      name: `${database.name}-postgres-password.yaml`,
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Secret
        metadata:
          name: ${database.name}-password-secret
        type: Opaque
        data:
          POSTGRES_PASSWORD: $${database.name.toUpperCase()}_POSTGRES_PASSWORD_BASE64
      `,
    };
  }
}


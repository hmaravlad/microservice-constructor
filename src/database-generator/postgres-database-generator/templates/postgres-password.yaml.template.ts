import { Database } from '../../../types/config/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresPasswordTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    const upperCaseName = database.name.toUpperCase().replace(/-/g, '_');
    return {
      name: `${database.name}-postgres-password.yaml`,
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Secret
        metadata:
          name: ${database.name}-postgres-password-secret
        type: Opaque
        data:
        ${upperCaseName}_PASSWORD: $${upperCaseName}_PASSWORD_BASE64
      `,
    };
  }
}


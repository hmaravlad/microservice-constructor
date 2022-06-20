import { Database } from '../../../types/config/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresVolTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    return {
      name: `${database.name}-vol.yaml`,
      path: 'infra/',
      data: `
        kind: PersistentVolume
        apiVersion: v1
        metadata:
          name: ${database.name}-volume
          labels:
            type: local
            app: ${database.name}
        spec:
          storageClassName: manual
          capacity:
            storage: ${database.sizeGb}Gi
          accessModes:
            - ReadWriteOnce
          hostPath:
            path: "/mnt/data"
        ---
        apiVersion: v1
        kind: "PersistentVolumeClaim"
        metadata:
          name: "${database.name}-data-claim"
        spec:
          storageClassName: manual
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: ${database.sizeGb}Gi
      `,
    };
  }
}


import { Database } from 'src/types/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresDeplTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    return {
      name: `${database.name}-postgres-depl.yaml`,
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Deployment
        metadata:
          name: ${database.name}-postgres-depl
          labels:
            app: ${database.name}-postgres-depl
        spec:
          replicas: 1
          template:
            metadata:
              labels:
                app: ${database.name}-postgres
            spec:
              containers:
              - image: postgres:9.4
                name: ${database.name}-postgres
                ports:
                - containerPort: 5432
                volumeMounts:
                - name: ${database.name}-postgres-data
                  mountPath: /var/lib/postgresql
              volumes:
              - name: ${database.name}-postgres-data
                persistentVolumeClaim:
                  claimName: ${database.name}-postgres-data-claim
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: ${database.name}-postgres-serv
          labels:
            name: ${database.name}-postgres-serv
        spec:
          type : ClusterIP
          ports:
            - name: ${database.name}-postgres
              port: 5432
              targetPort : 5432
          selector:
            app: ${database.name}-postgres
      `,
    };
  }
}


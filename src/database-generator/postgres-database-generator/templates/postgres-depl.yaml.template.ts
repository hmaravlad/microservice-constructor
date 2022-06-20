import { Database } from '../../../types/config/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresDeplTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    const name = database.name.toLowerCase();
    return {
      name: `${name}-postgres-depl.yaml`,
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Deployment
        metadata:
          name: ${name}-postgres-depl
          labels:
            app: ${name}-postgres-depl
        spec:
          replicas: 1
          template:
            metadata:
              labels:
                app: ${name}-postgres
            spec:
              containers:
              - image: postgres:9.4
                name: ${name}-postgres
                ports:
                - containerPort: 5432
                volumeMounts:
                - name: ${name}-postgres-data
                  mountPath: /var/lib/postgresql
                env:
                  - name: POSTGRES_DB
                    value: '${name}'
                  - name: POSTGRES_USER
                    value: '${name}-admin'
                  - name: POSTGRES_PASSWORD
                    valueFrom:
                      secretKeyRef:
                        name: ${name}-password-secret
                        key: ${name.toUpperCase().replace(/-/g, '_')}_PASSWORD            
              volumes:
              - name: ${name}-postgres-data
                persistentVolumeClaim:
                  claimName: ${name}-postgres-data-claim
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: ${name}-postgres-serv
          labels:
            name: ${name}-postgres-serv
        spec:
          type : ClusterIP
          ports:
            - name: ${name}-postgres
              port: 5432
              targetPort : 5432
          selector:
            app: ${name}-postgres
      `,
    };
  }
}


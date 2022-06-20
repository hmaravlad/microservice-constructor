import { Database } from '../../../types/config/database';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class PostgresDeplTemplate implements FileTemplate<Database> {
  getFile(database: Database): File {
    const name = database.name.toLowerCase();
    return {
      name: `${name}-depl.yaml`,
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Deployment
        metadata:
          name: ${name}-depl
          labels:
            app: ${name}-depl
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: ${name}      
          template:
            metadata:
              labels:
                app: ${name}
            spec:
              containers:
              - image: postgres:9.4
                name: ${name}
                ports:
                - containerPort: 5432
                volumeMounts:
                - name: ${name}-data
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
              - name: ${name}-data
                persistentVolumeClaim:
                  claimName: ${name}-data-claim
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: ${name}-serv
          labels:
            name: ${name}-serv
        spec:
          type : ClusterIP
          ports:
            - name: ${name}
              port: 5432
              targetPort : 5432
          selector:
            app: ${name}
      `,
    };
  }
}


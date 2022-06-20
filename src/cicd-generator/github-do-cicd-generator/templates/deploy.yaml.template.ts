import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ProjectConfig } from '../../../types/config/project-config';
import { ServiceConfig } from '../../../types/config/service-config';

export class DeployYamlTemplate implements FileTemplate<ServiceConfig> {
  constructor(private projectConfig: ProjectConfig) {}

  getFile(serviceConfig: ServiceConfig): File{
    return {
      name: `deploy-${serviceConfig.name}.yaml`,
      path: '.github/workflows',
      data: `
        name: ${serviceConfig.name}

        on:
          push:
            branches: [ main ]
            paths: [ '${serviceConfig.name}/**' ]
        
        jobs:
          build:
            runs-on: ubuntu-latest
            defaults:
              run:
                working-directory: ./auth      
            steps:
            - uses: actions/checkout@v2
            - run: docker build -t  ${this.projectConfig.dockerUsername}/${serviceConfig.name} .
            - run: docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
              env:
                DOCKER_USERNAME: \${{ secrets.DOCKER_USERNAME }}
                DOCKER_PASSWORD: \${{ secrets.DOCKER_PASSWORD }}
            - run: docker push ${this.projectConfig.dockerUsername}/${serviceConfig.name}
            - uses: digitalocean/action-doctl@v2
              with:
                token: \${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
            - run: doctl kubernetes cluster kubeconfig save \${{ secrets.CLUSTER_ID }}
            - run: kubectl rollout restart deployment ${serviceConfig.name}-depl 
      `,
    };
  }
}


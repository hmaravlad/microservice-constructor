import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ProjectConfig } from '../../../types/config/project-config';

export class DeployManifestsYamlTemplate implements FileTemplate<ProjectConfig> {
  getFile(projectConfig: ProjectConfig): File{
    return {
      name: 'deploy-manifests.yaml',
      path: '.github/workflows',
      data: `
        name: deploy-manifests

        on:
          push:
            branches: [ main ]
            paths: [ 'infra/**' ]
        
        jobs:
          build:
            runs-on: ubuntu-latest
            steps:
            - uses: actions/checkout@v2
            - uses: digitalocean/action-doctl@v2
              with:
                token: \${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
            - run: doctl kubernetes cluster kubeconfig save ${projectConfig.name}
            - run: kubectl apply -f infra/k8s
      `,
    };
  }
}


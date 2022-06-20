import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { addIndentation } from '../../../utils/add-indentation';

export class DeployManifestsYamlTemplate implements FileTemplate<string[]> {
  getFile(secrets: string[]): File{
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
            - run: |
                ${addIndentation(secrets.map(secret => `export ${secret}=\${{ secrets.${secret} }}`).join('\n'), '\t\t\t\t\t\t\t\t', true)}
                perl -pi.back -e 's/\\$([A-Z0-9_]+)/$ENV{$1}/g' infra/*
            - uses: digitalocean/action-doctl@v2
              with:
                token: \${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
            - run: doctl kubernetes cluster kubeconfig save \${{ secrets.CLUSTER_ID }}
            - run: kubectl apply -f infra/
      `,
    };
  }
}


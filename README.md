# Find Serverless Framework APIs inside a Turborepo (monorepo) repository

This action loops through all the apps and find the serverless.yml files inside them.

## Inputs

## `apps-directory`

**Required** The directory where the APIs are located. Default `"apps"`.

## Outputs

## `serverless-apps`

JSON string with the serverless apps found.

## Example usage

```yaml
jobs:
  serverless_directories:
    runs-on: ubuntu-latest
    name: Find Serverless Framework API
    steps:
      - uses: actions/checkout@v2

      - name: Get Serverless Framework API`s
        id: scan
        uses: aaron5670/turborepo-serverless-framework-action@v1.0
        with:
          apps-directory: 'apps'

      - name: Get Serverless Apps directories
        run: echo "Serverless app directories ${{ steps.scan.outputs.serverless-apps }}"
```


### Development

Before you create a new release, run the command `ncc build index.js --license licenses.txt` to compile the action.

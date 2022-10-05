const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('@actions/glob');

try {
  // `apps-directory` input defined in action metadata file
  const appsDirectory = core.getInput('apps-directory', {required: true});
  console.log(`Given applications directory is: "${appsDirectory}".`);

  /** Uncomment below to return a mocked list of directories **/
    // core.setOutput("serverless-apps", JSON.stringify(["apps/availability-api"]));

    // Here we loop through the monorepo and return the path to each Serverless app
  const findFiles = async () => {
      const serverlessApps = [];
      const repo = github.context.payload.repository.name;
      const runnerPath = `/home/runner/work/${repo}/${repo}`;
      console.log('repo', repo);
      console.log('runnerPath', runnerPath);

      const patterns = [`${appsDirectory}/!*!/serverless.yml`, `${appsDirectory}/!*!/serverless.yaml`]
      console.log('patterns', patterns);
      const globber = await glob.create(patterns.join('\n'))
      for await (const file of globber.globGenerator()) {
        console.log('file', file);
        serverlessApps.push(
          file
            .replace(runnerPath, '')
            .replace('serverless.yaml', '')
            .replace('serverless.yml', '')
        );
      }

      return serverlessApps;
    }
  findFiles().then((serverlessApps) => {
    console.log('Serverless Apps found:', JSON.stringify(serverlessApps, undefined, 2));
    core.setOutput("serverless-apps", JSON.stringify(JSON.stringify(['apps/availability-api'])));
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload.repository.name, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

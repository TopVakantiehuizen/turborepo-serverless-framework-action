const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('@actions/glob');

try {
  // `apps-directory` input defined in action metadata file
  const appsDirectory = core.getInput('apps-directory', { required: true });
  console.log(`Given applications directory is: "${appsDirectory}".`);

  core.info('\u001b[35mLooping through files in the monorepo');
  const findFiles = async () => {
    const serverlessApps = [];
    const repo = github.context.payload.repository.name;
    const runnerPath = `/home/runner/work/${repo}/${repo}/`;

    const patterns = [`${appsDirectory}/*/serverless.yml`, `${appsDirectory}/*/serverless.yaml`]
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
      const app = file
        .replace(runnerPath, '')
        .replace('serverless.yml', '')
        .replace('serverless.yaml', '');
      serverlessApps.push(app);
    }

    return serverlessApps;
  }
  findFiles().then((serverlessApps) => {
    console.log('Done looping through files in the monorepo, found the following serverless apps:');
    console.log(JSON.stringify(serverlessApps, undefined, 2));
    core.setOutput("serverless-apps", JSON.stringify(JSON.stringify(serverlessApps)));
  });
} catch (error) {
  core.setFailed(error.message);
}

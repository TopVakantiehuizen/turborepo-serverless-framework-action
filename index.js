const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('@actions/glob');

try {
  // `apps-directory` input defined in action metadata file
  const appsDirectory = core.getInput('apps-directory', { required: true });
  console.log(`Apps directory is: ${appsDirectory}!`);

  // Here we loop through the monorepo and return the path to each app
  // const serverlessApps = [
  //   'availability-api',
  //   'booking-api',
  // ];
  // core.setOutput("serverless-apps", JSON.stringify(serverlessApps, undefined, 2));

  core.info('\u001b[35mLooping through files in the monorepo');
  const findFiles = async () => {
    const serverlessApps = [];
    const patterns = [`${appsDirectory}/*/serverless.yml`, `${appsDirectory}/*/serverless.yaml`]
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
      console.log(file)
      serverlessApps.push(file);
    }

    return serverlessApps;
  }
  findFiles().then((serverlessApps) => {
    console.log('Done looping through files in the monorepo');
    core.setOutput("serverless-apps", JSON.stringify(serverlessApps, undefined, 2));
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `apps-directory` input defined in action metadata file
  const appsDirectory = core.getInput('apps-directory');
  console.log(`The directory where the apps are located: ${appsDirectory}!`);

  core.setOutput("apps-directory", appsDirectory);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

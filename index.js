const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `apps-directory` input defined in action metadata file
  const appsDirectory = core.getInput('apps-directory');
  console.log(`Apps directory is: ${appsDirectory}!`);

  // Here we loop through the monorepo and return the path to each app
  const serverlessApps = [
    'availability-api',
    'booking-api',
  ];
  core.setOutput("serverless-apps", JSON.stringify(serverlessApps, undefined, 2));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

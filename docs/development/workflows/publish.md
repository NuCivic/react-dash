# NPM Publication
**NOTE** that this page relates to internal react-dash development workflows, not to implementations or library usage

## Versioning Info
We use semver http://semver.org/ :
x.y.z     x = major version (not currently implemented), y = minor version, z = patch version
minor versions are NOT backward compatible before v1.0.0 (0.7.x is not guaranteed to be backwards compatible with 0.6.x)
patch versions should maintain backwards compatibility (0.7.2 should be compatible with 0.7.3)

## Dependencies

1. Set up an account on npm
1. Get added as maintainer on https://www.npmjs.com/package/react-dash and on the github repository
1. Identify the next release based on semantic versioning, in the form of `x.y.z`
1. Verify you have the appropriate git remotes, both an `origin` for your fork and an `upstream` for the React Dash repository
1. A GPG key setup in github. How to generate a GPG key: https://help.github.com/articles/generating-a-new-gpg-key/


## Creating a new release

** All dev branches should be pushed to and tested in the integration branch. Each dev branch should contain changelog.md notes of changes made/features added in the ticket.

1. After all the dev branches slated for release have been merged into integration , confirm that the updates in the changelog from individual branches completely describes the new release.
1. In ReactDashboard.js, update the version number in the console.log statement (line 2, for now) to reflect the react-dash version that you are about release. `console.log('React Dashboard -- 0.7.2');`
1. Check the status of your local repository for any unwanted changes: `git status` (please note: you should not have any unexpected local changes that have not been code reviewed within a pull request)
1. Commit the changelog and any final changes: `git commit -a -m "Changelog for the [x.y.z] release"` (please substitute x.y.z for the new release)
1. Verify that you are in the integration branch: `git branch -v`. 
1. If you are not on the master branch, please merge your current branch (which should be your release candidate) into master: `git checkout master && git merge [branch from previous step]` (please substitute the [branch from previous step] with the output from the aforementioned branch verification step)
1. Update the version of the package: `npm version [ patch | minor ]` (please substitute specifically with the word `patch` or `minor`).
   **NOTE:** This step cannot be successfully completed without an existing GPG key in github.
1. Publish the package: `npm publish`
1. Commit the package and tag: `git commit -a -m "Package info for the [x.y.z] release" && git push upstream master --tags` (please substitute x.y.z for the new release)
1. Go to the github releases page, confirm that the `npm publish` step created a new release from the x.y.z tag.

## Release verification

Confirm that publication was successful (eg: `npm install react-dash@0.3.5` then confirm that code updates are valid)

maintain backwards compatibility (0.7.2 should be compatible with 0.7.3)

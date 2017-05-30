# NPM Publication
**NOTE** that this page relate to internal react-dash development workflows, not to implementations or library usage

## Versioning Info
We use semver http://semver.org/ :
x.y.z     x = major version (not currently implemented), y = minor version, z = patch version
minor versions are NOT backward compatible before v1.0.0 (0.7.x is not guaranteed to be backwards compatible with 0.6.x)
patch versions should maintain backwards compatibility (0.7.2 should be compatible with 0.7.3)

##Workflow
* Do development
* Test / QA
* update changelog
* `git commit -am "Commit message - includes build"`
* `git push origin my-dev-branch`
* Submit PR - include description of work done, include acceptance criteria
* Confirm that PR is merged, then...
* `git pull`
* `npm run build`
* `git add --force dist/`
* `git co -b release.x.y.z`
* `git ci -a`
* `git br -D release.x.y.z`
* `npm version patch/minor`
* `npm publish`
* `git push --tags`
* confirm that publication was successful (eg: `npm install react-dash@0.3.5` then confirm that code updates are valid)

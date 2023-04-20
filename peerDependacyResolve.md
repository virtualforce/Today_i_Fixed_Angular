## Problem
Fix the upstream dependency conflict, or retry this command with `--force` or `--legacy-peer-deps`

![peerdependcy](https://user-images.githubusercontent.com/48677205/233332694-9b3f739b-c856-40fe-9d08-15370200673d.png)

## Environment
- Visual Studio Code
- Angular

## How you fix it
If you have an old web development project, it's important to update the packages you used to build it. This is because updates include new features, fix bugs, and improve security. To do this safely, you can use a tool called `NPM Check Updates`, which helps you with the update process.

## Solution
### 1- Install NPM Check Updates.
It’s often best to just install NPM check updates globally. (Alternatively, you can run it with NPX.)

`npm install -g npm-check-updates`

### 2- Run NPM Check Updates.
cd to a directory with your project and run the following command.

`npx ncu`

This will give you list of packages from your project that need to be updated.

![npx ncu](https://user-images.githubusercontent.com/48677205/233333344-75c79897-f746-4ee1-91d7-8cc948effbd6.png)

Left is your existing version and right is the latest one.NPU maintains semantic versioning policies, so you can quickly identify patches, minor updates, or major updates that need fixing.

### 3- Update Patches.
First you need to run the following command.

`npx ncu -u -t patch`

Now run `npm i` and confirm that your app is working properly, and commit the changes. this should not break anything.

### 4- Update Minor Versions.
Run the following command.

`npx ncu -u -t minor`

Now run `npm i` and confirm that your app is working properly, and commit the changes. this should not break anything.

### 5- Update Major Versions.
Before update the major versions you should read the release notes first to see how the new version will affect your project and always try to update each major change in separate commit.
Now try to update specific package one by one by using the `–filter` or `-f` flag with `ncu`. Run following command.

`npx ncu -u -f xyz-package`

Now run `npm i` and ensure the app working properly, you can revert changes if necessary. Then do this for all packages that need major update.




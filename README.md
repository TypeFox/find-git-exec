# find-git-exec
[![Build Status](https://travis-ci.org/TypeFox/find-git-exec.svg?branch=master)](https://travis-ci.org/TypeFox/find-git-exec)

A lightweight library for locating the Git executable on the host system.
This library is a stripped down version of the Git discovery logic [implemented and used by VS Code](https://github.com/microsoft/vscode/blob/master/extensions/git/src/git.ts#L50-L141).

## Requirements
```
  "engines": {
    "node": ">=10.11.0 <13"
  },
```

## Install
```bash
yarn add find-git-exec
```

## Build
```bash
yarn build
```

## Test
```bash
yarn test
```

## Example
```javascript
import findGit from './find-git-exec';

findGit().then(git => {
    const { version, path } = git;
    console.log(`Git version: ${version}`);
    console.log(`Git path: ${path}`);
}).catch(error => {
    console.error(error);
});
```

## License
Copyright (c) - TypeFox.
Licensed under the [MIT](LICENSE) license.
# find-git-exec
[![Build Status](https://travis-ci.org/TypeFox/find-git-exec.svg?branch=master)](https://travis-ci.org/TypeFox/find-git-exec)
[![Build status](https://ci.appveyor.com/api/projects/status/8x9w27df2bit7jan/branch/master?svg=true)](https://ci.appveyor.com/project/kittaakos/find-git-exec/branch/master)

A lightweight library for locating the Git executable on the host system.

## Install
```bash
npm i -S find-git-exec
```

## Build
```bash
npm run build
```

## Test
```bash
npm run test
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
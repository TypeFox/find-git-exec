# find-git-exec

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
```


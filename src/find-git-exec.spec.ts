/*
 * Copyright (c) 2017 TypeFox. Licensed under the MIT License.
 * See the LICENSE file in the project root for license information.
 */

import * as fs from 'fs';
import { expect } from 'chai';
import findGit from './find-git-exec';

describe('find-git-exec', async () => {

    it('find', async () => {
        const git = await findGit({ hint: undefined, onLookup: (p: string) => console.log(`[TRACE]: Git discovery: ${p}`) });
        const { path, version, execPath } = git;
        expect(fs.existsSync(path), `[path]: expected ${path} to exist on the filesystem`).to.be.true;
        expect(fs.existsSync(execPath), `[execPath]: expected ${execPath} to exist on the filesystem`).to.be.true;
        expect(version.startsWith('2'), `[version]: expected version 2.x was ${version} instead`).to.be.true;
    });

});
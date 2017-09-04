/*
 * Copyright (c) 2017 TypeFox. Licensed under the MIT License.
 * See the LICENSE file in the project root for license information.
 */

import * as fs from 'fs';
import { expect } from 'chai';
import findGit from './find-git-exec';

describe('find-git-exec', async () => {

    it('find', async () => {
        const git = await findGit();
        const { path, version, execPath } = git;
        expect(fs.existsSync(path)).to.be.true;
        expect(fs.existsSync(execPath)).to.be.true;
        expect(version.startsWith('2')).to.be.true;
    });

});
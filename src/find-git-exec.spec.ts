/*
 * Copyright (c) 2017 TypeFox. Licensed under the MIT License.
 * See the LICENSE file in the project root for license information.
 */

import * as fs from 'fs';
import { expect, assert } from 'chai';
import findGit from './find-git-exec';

describe('find-git-exec', async () => {

    it('find', async () => {
        if (hasGit()) {
            const git = await findGit();
            const { path, version, execPath } = git;
            expect(fs.existsSync(path)).to.be.true;
            expect(fs.existsSync(execPath)).to.be.true;
            expect(version.startsWith('2')).to.be.true;
        } else {
            try {
                const { path } = await findGit();
                const message = `We would have expected a rejection here. Git should not exist on the host but apparently it was there: ${path}.`;
                assert.isOk(false, message);
            } catch (error) {
                expect(error.message.startsWith('Git not found')).to.be.true;
            }
        }
    });

});

// The CI has to make sure the Git executable does not exist. Just to have a negative test as well.
function hasGit() {
    const hasGit = !((process.env.NO_GIT_EXEC || 'false') === 'true');
    if (!hasGit) {
        console.log(`Detected 'NO_GIT_EXEC' environment variable with false value. Executing negative tests.`);
    }
    return hasGit;
}
/*
 * Copyright (c) 2017 TypeFox. Licensed under the MIT License.
 * See the LICENSE file in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

/**
 * Bare minimum information of the locally available git executable.
 */
export interface Git {

    /**
     * The FS path to the Git executable.
     */
    readonly path: string,
    /**
     * The Git version. [`git --version`]
     */
    readonly version: string,
    /**
     * The path to wherever your core Git programs are installed. [`git --exec-path`]
     */
    readonly execPath: string

}

/**
 * Resolves to the path of the locally available Git executable. Will be rejected if Git cannot be found on the system.
 */
export default function (): Promise<Git> {
    switch (process.platform) {
        case 'win32': return findGitWin32();
        default: return findGitNix();
    }
}

async function findGit(path: string): Promise<Git> {
    return new Promise<Git>(async (resolve, reject) => {
        try {
            resolve({
                path,
                version: parseVersion(await exec(path, '--version')),
                execPath: await exec(path, '--exec-path')
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function exec(path: string, command: string | string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const buffers: Buffer[] = [];
        const child = cp.spawn(path, Array.isArray(command) ? command : [command]);
        child.stdout.on('data', (b: Buffer) => buffers.push(b));
        child.on('error', reject);
        child.on('exit', code => code ? reject(new Error(`Git not found under '${path}'.`)) : resolve(toUtf8String(buffers)));
    });
}

async function findGitNix(): Promise<Git> {
    return new Promise<Git>((resolve, reject) => {
        cp.exec('which git', (error, buffer) => {
            if (error) {
                return reject('Git not found.');
            }
            const path = buffer.toString().replace(/^\s+|\s+$/g, '');
            if (path !== 'usr/bin/git' || process.platform !== 'darwin') {
                return resolve(findGit(path));
            }
            cp.exec('xcode-select -p', (error: any) => {
                if (error && error.code === 2) {
                    return reject(new Error('Git not found.'));
                }
                resolve(findGit(path));
            });
        });
    });
}

async function findSystemGitWin32(base: string): Promise<Git> {
    if (!base) {
        throw new Error(`Git not found.`);
    }
    return findGit(path.join(base, 'Git', 'cmd', 'git.exe'));
}

async function findGitHubGitWin32(): Promise<Git> {
    const github = path.join(env('LOCALAPPDATA'), 'GitHub');
    return new Promise<Git>((resolve, reject) => {
        fs.readdir(github, (error: NodeJS.ErrnoException, files: string[]) => {
            if (error) {
                return reject(error);
            }
            const git = files.filter(file => /^PortableGit/.test(file)).shift();
            if (!git) {
                return reject(new Error(`Git not found.`));
            }
            resolve(findGit(path.join(github, git, 'cmd', 'git.exe')));
        })
    });
}

async function findGitWin32(): Promise<Git> {
    return findSystemGitWin32(env('ProgramW6432'))
        .then(undefined, () => findSystemGitWin32(env('ProgramFiles(x86)'))
            .then(undefined, () => findSystemGitWin32(env('ProgramFiles'))
                .then(undefined, () => findGit('git'))
                .then(undefined, () => findGitHubGitWin32())));
}

function toUtf8String(buffers: Buffer[]): string {
    return Buffer.concat(buffers).toString('utf8').trim();
}

function parseVersion(raw: string): string {
    return raw.replace(/^git version /, '');
}

function env(key: string): string {
    return process.env[key] || '';
}
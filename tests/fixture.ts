import { test as base } from '@playwright/test';

export const test = base.extend<
    {},
    {
        user: {
            name: string;
        },
        _createUser: string,
    }
>({
    user: [{name: 'alice'}, {scope: 'worker'}],
    _createUser: [async ({user}, use, workerInfo) => {
        const userName = user.name;
        console.log('Creating new user', userName, workerInfo.workerIndex, workerInfo.parallelIndex);

        await use(userName);
    }, {scope: 'worker', timeout: 30_000, auto: true}],
});

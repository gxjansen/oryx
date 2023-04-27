#!/usr/bin/env node

import { cliApp } from '@spryker-oryx/cli';

const args = ['create', ...process.argv.slice(2)];

cliApp.withOptions({ cli: { args } }).create();
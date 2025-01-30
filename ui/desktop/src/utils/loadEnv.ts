import { execSync } from 'child_process';
import log from './logger';

export interface EnvVariables {
  [key: string]: string;
}

export function processEnvString(envStr: string): EnvVariables {
  const env: EnvVariables = {};
  envStr.split('\n').forEach((line) => {
    const matches = line.match(/^([^=]+)=(.*)$/);
    if (matches) {
      const [, key, value] = matches;
      env[key] = value;
    }
  });
  return env;
}

export function loadShellEnv(isProduction: boolean = false): void | EnvVariables {
  // Only proceed if in production mode
  if (!isProduction) {
    log.info('Skipping shell environment loading: Not in production mode');
    return;
  }

  try {
    // Get the user's default shell from SHELL env var, fallback to /bin/sh
    const userShell = process.env.SHELL || '/bin/sh';
    log.info(`Loading environment from shell: ${userShell}`);

    // Run a login shell (-l) to get the environment
    const envStr = execSync(`${userShell} -l -c 'env'`, {
      encoding: 'utf-8',
      env: process.env, // Pass through current environment as starting point
    });

    const env = processEnvString(envStr);
    log.info('Successfully loaded shell environment variables');

    // Apply to current process
    Object.entries(env).forEach(([key, value]) => {
      process.env[key] = value;
    });

    return env;
  } catch (error) {
    log.error('Failed to load shell environment variables:', error);
    return {};
  }
}

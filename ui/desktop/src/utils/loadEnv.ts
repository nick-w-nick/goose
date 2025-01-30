import { execSync } from 'child_process';
import path from 'path';
import log from './logger';
import fs from 'node:fs';

interface ShellConfig {
  shell: string;
  configFiles: string[];
  systemConfigFiles?: string[]; // Added system-wide config files
}

export interface EnvVariables {
  [key: string]: string;
}

export const SHELL_CONFIGS: ShellConfig[] = [
  {
    shell: '/bin/zsh',
    configFiles: ['.zshenv', '.zprofile', '.zshrc', '.zlogin'], // Order matters for zsh
    systemConfigFiles: ['/etc/zshenv', '/etc/zprofile', '/etc/zshrc', '/etc/zlogin'],
  },
  {
    shell: '/bin/bash',
    configFiles: ['.profile', '.bash_profile', '.bashrc'], // bash reads .profile first if others don't exist
    systemConfigFiles: ['/etc/profile', '/etc/bash.bashrc'],
  },
];

export function findExistingConfigs(
  configFiles: string[],
  homeDir: string,
  isSystem: boolean = false
): string[] {
  // Return files in the same order as the input array, but only those that exist
  return configFiles.filter((config) => {
    const configPath = isSystem ? config : path.join(homeDir, config);
    return fs.existsSync(configPath);
  });
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

export function mergeEnvironments(envs: EnvVariables[]): EnvVariables {
  const merged: EnvVariables = {};

  // Special handling for PATH-like variables
  const pathLikeVars = [
    'PATH',
    'MANPATH',
    'LIBRARY_PATH',
    'LD_LIBRARY_PATH',
    'PYTHONPATH',
    'GOPATH',
    'NODE_PATH',
  ];

  // Process environments in order, with special handling for PATH-like variables
  envs.forEach((env) => {
    Object.entries(env).forEach(([key, value]) => {
      if (pathLikeVars.includes(key)) {
        // For PATH-like variables, preserve order of the latest env but include all paths
        const existingPaths = merged[key] ? merged[key].split(':') : [];
        const newPaths = value.split(':');
        const allPaths = [...newPaths];

        // Add any existing paths that aren't in the new paths
        existingPaths.forEach((p) => {
          if (!allPaths.includes(p)) {
            allPaths.push(p);
          }
        });

        merged[key] = allPaths.join(':');
      } else {
        // For other variables, just override
        merged[key] = value;
      }
    });
  });

  return merged;
}

function loadEnvFromShell(shell: string, configPath: string): EnvVariables {
  try {
    const envStr = execSync(`${shell} -c 'source ${configPath} && env'`, {
      encoding: 'utf-8',
    });

    const env = processEnvString(envStr);
    log.info(`Successfully loaded environment variables from ${configPath}`);
    return env;
  } catch (error) {
    log.error(`Failed to load environment variables from ${configPath}:`, error);
    return {};
  }
}

export function loadShellEnv(
  isProduction: boolean = false,
  options: {
    userShell?: string;
    homeDir?: string;
    testMode?: boolean;
    mockEnvs?: { [key: string]: string };
  } = {}
): void | EnvVariables {
  const {
    userShell = process.env.SHELL,
    homeDir = process.env.HOME || '',
    testMode = false,
    mockEnvs = {},
  } = options;

  // Only proceed if in production mode or test mode
  if (!isProduction && !testMode) {
    log.info('Skipping shell environment loading: Not in production mode');
    return;
  }

  log.info(`User's default shell: ${userShell}`);

  // Get all environment configurations
  const allEnvs: EnvVariables[] = [];

  if (testMode) {
    // In test mode, just return the merged mock environments
    return mergeEnvironments(Object.values(mockEnvs));
  }

  // Function to load environment either from shell or mock data
  const getEnvForConfig = (shell: string, configPath: string): EnvVariables => {
    if (testMode) {
      return mockEnvs[configPath] || {};
    }
    return loadEnvFromShell(shell, configPath);
  };

  // First load non-default shell configurations
  SHELL_CONFIGS.forEach((config) => {
    if (config.shell !== userShell) {
      // Load system configs first
      if (config.systemConfigFiles) {
        const systemConfigs = findExistingConfigs(config.systemConfigFiles, '', true);
        systemConfigs.forEach((configFile) => {
          const env = getEnvForConfig(config.shell, configFile);
          allEnvs.push(env);
        });
      }

      // Then load user configs
      const userConfigs = findExistingConfigs(config.configFiles, homeDir);
      userConfigs.forEach((configFile) => {
        const configPath = path.join(homeDir, configFile);
        const env = getEnvForConfig(config.shell, configPath);
        allEnvs.push(env);
      });
    }
  });

  // Then load the user's default shell configuration last so it takes precedence
  const defaultShellConfig = SHELL_CONFIGS.find((config) => config.shell === userShell);
  if (defaultShellConfig) {
    // Load system configs first
    if (defaultShellConfig.systemConfigFiles) {
      const systemConfigs = findExistingConfigs(defaultShellConfig.systemConfigFiles, '', true);
      systemConfigs.forEach((configFile) => {
        const env = getEnvForConfig(defaultShellConfig.shell, configFile);
        allEnvs.push(env);
      });
    }

    // Then load user configs
    const userConfigs = findExistingConfigs(defaultShellConfig.configFiles, homeDir);
    userConfigs.forEach((configFile) => {
      const configPath = path.join(homeDir, configFile);
      const env = getEnvForConfig(defaultShellConfig.shell, configPath);
      allEnvs.push(env);
    });
  } else {
    log.warn(`No configuration found for shell: ${userShell}`);
  }

  // Merge all environments, with the user's default shell taking precedence
  if (allEnvs.length > 0) {
    const mergedEnv = mergeEnvironments(allEnvs);
    if (!testMode) {
      Object.entries(mergedEnv).forEach(([key, value]) => {
        process.env[key] = value;
      });
    }
    log.info('Successfully merged and applied environment variables from all shells');
    return mergedEnv;
  } else {
    log.warn('No shell configurations were successfully loaded');
    return {};
  }
}

// Keep the old function name for backward compatibility
export function loadZshEnv(isProduction: boolean = false): void {
  return loadShellEnv(isProduction);
}

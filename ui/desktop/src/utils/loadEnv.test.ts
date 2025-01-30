import { describe, expect, it, vi } from 'vitest';
import {
  processEnvString,
  mergeEnvironments,
  findExistingConfigs,
  loadShellEnv,
  EnvVariables,
} from './loadEnv';

// Mock electron-log
vi.mock('./logger', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('loadEnv', () => {
  describe('processEnvString', () => {
    it('should correctly parse environment string', () => {
      const envStr = 'PATH=/usr/bin:/bin\nHOME=/home/user\nTERM=xterm';
      const result = processEnvString(envStr);
      expect(result).toEqual({
        PATH: '/usr/bin:/bin',
        HOME: '/home/user',
        TERM: 'xterm',
      });
    });

    it('should handle empty string', () => {
      expect(processEnvString('')).toEqual({});
    });

    it('should skip invalid lines', () => {
      const envStr = 'PATH=/usr/bin\nINVALID_LINE\nHOME=/home/user';
      const result = processEnvString(envStr);
      expect(result).toEqual({
        PATH: '/usr/bin',
        HOME: '/home/user',
      });
    });
  });

  describe('mergeEnvironments', () => {
    it('should merge PATH-like variables correctly', () => {
      const env1: EnvVariables = { PATH: '/usr/bin:/bin' };
      const env2: EnvVariables = { PATH: '/home/user/bin:/usr/bin' };
      const result = mergeEnvironments([env1, env2]);
      expect(result.PATH).toBe('/home/user/bin:/usr/bin:/bin');
    });

    it('should override non-PATH variables with latest value', () => {
      const env1 = { EDITOR: 'nano', TERM: 'xterm' };
      const env2 = { EDITOR: 'vim' };
      const result = mergeEnvironments([env1, env2]);
      expect(result).toEqual({
        EDITOR: 'vim',
        TERM: 'xterm',
      });
    });

    it('should handle empty environments', () => {
      expect(mergeEnvironments([])).toEqual({});
      expect(mergeEnvironments([{}])).toEqual({});
    });

    it('should handle multiple PATH-like variables', () => {
      const env1 = {
        PATH: '/usr/bin:/bin',
        MANPATH: '/usr/share/man',
        GOPATH: '/usr/local/go',
      };
      const env2 = {
        PATH: '/home/user/bin:/usr/bin',
        MANPATH: '/home/user/man:/usr/share/man',
        GOPATH: '/home/user/go',
      };
      const result = mergeEnvironments([env1, env2]);
      expect(result).toEqual({
        PATH: '/home/user/bin:/usr/bin:/bin',
        MANPATH: '/home/user/man:/usr/share/man',
        GOPATH: '/home/user/go:/usr/local/go', // GOPATH is PATH-like, so it should be merged
      });
    });
  });

  describe('loadShellEnv', () => {
    it('should load and merge environments correctly in test mode', () => {
      const mockEnvs = {
        '/etc/zshenv': {
          PATH: '/usr/bin',
          SYSTEM_VAR: 'system',
        },
        '/home/test/.zshenv': {
          PATH: '/home/test/bin:/usr/bin',
          USER_VAR: 'user',
        },
        '/home/test/.zshrc': {
          PATH: '/home/test/local/bin:/home/test/bin:/usr/bin',
          SHELL_VAR: 'zsh',
        },
      };

      const result = loadShellEnv(true, {
        userShell: '/bin/zsh',
        homeDir: '/home/test',
        testMode: true,
        mockEnvs,
      });

      expect(result).toEqual({
        PATH: '/home/test/local/bin:/home/test/bin:/usr/bin',
        SYSTEM_VAR: 'system',
        USER_VAR: 'user',
        SHELL_VAR: 'zsh',
      });
    });

    it('should skip loading in non-production mode', () => {
      const result = loadShellEnv(false);
      expect(result).toBeUndefined();
    });
  });

  describe('findExistingConfigs', () => {
    it('should find existing user config files', () => {
      const mockHomeDir = '/home/test';
      const configFiles = ['.zshenv', '.zshrc', '.nonexistent']; // Order matches expected output

      // Mock fs.existsSync for testing
      const originalExistsSync = require('fs').existsSync;
      require('fs').existsSync = (path: string) => {
        return path.includes('.zshrc') || path.includes('.zshenv');
      };

      const result = findExistingConfigs(configFiles, mockHomeDir);
      expect(result).toEqual(['.zshenv', '.zshrc']);

      // Restore original existsSync
      require('fs').existsSync = originalExistsSync;
    });

    it('should find existing system config files', () => {
      const configFiles = ['/etc/zshenv', '/etc/zshrc', '/etc/nonexistent'];

      // Mock fs.existsSync for testing
      const originalExistsSync = require('fs').existsSync;
      require('fs').existsSync = (path: string) => {
        return path.includes('/etc/zshenv') || path.includes('/etc/zshrc');
      };

      const result = findExistingConfigs(configFiles, '', true);
      expect(result).toEqual(['/etc/zshenv', '/etc/zshrc']);

      // Restore original existsSync
      require('fs').existsSync = originalExistsSync;
    });
  });
});

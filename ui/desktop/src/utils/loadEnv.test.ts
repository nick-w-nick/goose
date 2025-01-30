import { describe, expect, it, vi, beforeEach } from 'vitest';
import { processEnvString, loadShellEnv } from './loadEnv';
import { execSync } from 'child_process';

// Mock child_process
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}));

// Mock electron-log
vi.mock('./logger', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('loadEnv', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    // Reset process.env.SHELL
    delete process.env.SHELL;
  });

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

  describe('loadShellEnv', () => {
    it('should skip loading in non-production mode', () => {
      const result = loadShellEnv(false);
      expect(result).toBeUndefined();
      expect(execSync).not.toHaveBeenCalled();
    });

    it('should use /bin/sh as fallback when SHELL is not set', () => {
      const mockEnv = 'PATH=/usr/bin\nHOME=/home/user\n';
      vi.mocked(execSync).mockReturnValue(mockEnv);

      loadShellEnv(true);

      expect(execSync).toHaveBeenCalledWith(
        "/bin/sh -l -c 'env'",
        expect.objectContaining({
          env: process.env,
        })
      );
    });

    it('should use SHELL from environment when available', () => {
      process.env.SHELL = '/bin/zsh';
      const mockEnv = 'PATH=/usr/bin\nHOME=/home/user\n';
      vi.mocked(execSync).mockReturnValue(mockEnv);

      loadShellEnv(true);

      expect(execSync).toHaveBeenCalledWith(
        "/bin/zsh -l -c 'env'",
        expect.objectContaining({
          env: process.env,
        })
      );
    });

    it('should update process.env with shell environment', () => {
      process.env.SHELL = '/bin/zsh';
      const mockEnv = 'PATH=/custom/bin:/usr/bin\nCUSTOM_VAR=test\n';
      vi.mocked(execSync).mockReturnValue(mockEnv);

      loadShellEnv(true);

      expect(process.env.PATH).toBe('/custom/bin:/usr/bin');
      expect(process.env.CUSTOM_VAR).toBe('test');
    });

    it('should handle shell execution errors', () => {
      process.env.SHELL = '/bin/zsh';
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error('Shell execution failed');
      });

      const result = loadShellEnv(true);

      expect(result).toEqual({});
    });
  });
});

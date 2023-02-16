import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class CommandRunnerService {
  public async runCommand(command: string) {
    const logger = new Logger(`${CommandRunnerService.name}: ${command}`);

    return new Promise<number>((resolve, reject) => {
      logger.log(`Spawns new Process...`);
      // ** exec() buffering the generated output (also have limit for the buffer size)
      // ** spawn() is better in a way, that we get the output real-time (without limit)
      const runner = spawn(command, [], { shell: true, env: process.env });

      runner.stdout.on('data', (data: Buffer) =>
        this.bufferToLog(data, logger, 'log'),
      );
      runner.stderr.on('data', (data: Buffer) =>
        this.bufferToLog(data, logger, 'error'),
      );
      runner.on('exit', (code) => {
        if (code === 0) {
          logger.log('Process exited successfully');
          resolve(code);
        } else {
          logger.error(`Process exited with code ${code}`);
          reject(code);
        }
      });

      logger.log(`Process started`);
    });
  }

  private bufferToLog(buffer: Buffer, logger: Logger, level: 'error' | 'log') {
    const string = buffer.toString();
    if (string !== '\n') {
      // filter out log messages, which porivdes no information
      logger[level](string);
    }
  }
}

import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import {
  COMMAND_RUNNER_MODULE_OPTIONS_TOKEN,
  COMMAND_RUNNER_OPTIONS_TYPE,
} from '../command-runner.module-definition';
import { CommandRunnerService } from '../command-runner.service';

@Injectable()
export class CommandRunnerOnBootstrapService implements OnApplicationBootstrap {
  private _status: 'initialized' | 'running' | 'succeded' | 'failed' =
    'initialized';

  public get status() {
    return this._status;
  }

  constructor(
    @Inject(COMMAND_RUNNER_MODULE_OPTIONS_TOKEN)
    private moduleOptions: typeof COMMAND_RUNNER_OPTIONS_TYPE,
    private readonly commandRunnerService: CommandRunnerService,
  ) {}

  async onApplicationBootstrap() {
    this._status = 'running';
    this.commandRunnerService
      .runCommand(this.moduleOptions.runCommandOnApplicationBootstrap)
      .then(() => {
        this._status = 'succeded';
      })
      .catch(() => {
        this._status = 'failed';
      });
  }
}

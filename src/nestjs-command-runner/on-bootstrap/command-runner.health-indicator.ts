import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { CommandRunnerOnBootstrapService } from './command-runner-on-bootstrap.service';

@Injectable()
export class CommandRunnerHealthIndicator extends HealthIndicator {
  constructor(
    private readonly commandRunnerOnBootstrapService: CommandRunnerOnBootstrapService,
  ) {
    super();
  }

  async isSucceded(key: string): Promise<HealthIndicatorResult> {
    const { status } = this.commandRunnerOnBootstrapService;
    const isSucceded = status === 'succeded';

    const result = this.getStatus(key, isSucceded, { status });

    if (isSucceded) {
      return result;
    }
    throw new HealthCheckError(
      'Command runner is failed or still running',
      result,
    );
  }
}

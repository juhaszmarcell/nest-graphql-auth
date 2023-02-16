import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import {
  COMMAND_RUNNER_ASYNC_OPTIONS_TYPE,
  COMMAND_RUNNER_OPTIONS_TYPE,
  CommandRunnerConfigurableModule,
} from './command-runner.module-definition';
import { CommandRunnerService } from './command-runner.service';
import { CommandRunnerHealthIndicator } from './on-bootstrap/command-runner.health-indicator';
import { CommandRunnerOnBootstrapService } from './on-bootstrap/command-runner-on-bootstrap.service';

const extendBaseDefinition = (baseDefinition: DynamicModule) => {
  let { imports, providers, exports } = baseDefinition;

  imports = [...(imports || []), TerminusModule];
  providers = [
    ...(providers || []),
    CommandRunnerOnBootstrapService,
    CommandRunnerHealthIndicator,
  ];
  exports = [...(exports || []), CommandRunnerHealthIndicator];

  return {
    ...baseDefinition,
    imports,
    providers,
    exports,
  };
};

@Module({
  providers: [CommandRunnerService],
  exports: [CommandRunnerService],
})
export class CommandRunnerModule extends CommandRunnerConfigurableModule {
  static register(options: typeof COMMAND_RUNNER_OPTIONS_TYPE): DynamicModule {
    return extendBaseDefinition(super.register(options));
  }

  static registerAsync(
    options: typeof COMMAND_RUNNER_ASYNC_OPTIONS_TYPE,
  ): DynamicModule {
    return extendBaseDefinition(super.registerAsync(options));
  }
}

import { ConfigurableModuleBuilder } from '@nestjs/common';

interface CommandRunnerModuleBaseOptions {
  runCommandOnApplicationBootstrap: string;
}

export const {
  ConfigurableModuleClass: CommandRunnerConfigurableModule,
  MODULE_OPTIONS_TOKEN: COMMAND_RUNNER_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE: COMMAND_RUNNER_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: COMMAND_RUNNER_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<CommandRunnerModuleBaseOptions>().build();

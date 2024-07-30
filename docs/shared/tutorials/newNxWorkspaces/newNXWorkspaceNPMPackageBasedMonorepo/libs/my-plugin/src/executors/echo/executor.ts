import {ExecutorContext, PromiseExecutor} from '@nx/devkit';
import { EchoExecutorSchema } from './schema';
import { exec } from 'child_process';
import { promisify } from 'util';

// related to -- schema's properties set up
export interface EchoExecutorOptions {
  textToEcho: string;
}

// TODO: Check PromiseExecutor<EchoExecutorSchema> vs Promise<{ success: boolean }>
// 1. PromiseExecutor<EchoExecutorSchema>
/*const echoExecutor: PromiseExecutor<EchoExecutorSchema> = async (options) => {
  console.log('Executor ran for Echo', options);
  return {
    success: true,
  };
};
export default echoExecutor;
*/

// 2. Promise<{ success: boolean }>
export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing "echo"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.textToEcho}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}

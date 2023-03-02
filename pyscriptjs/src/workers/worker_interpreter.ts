// [!] Error: Could not resolve './foo' from src/workers/worker_interpreter.ts
import { add } from './foo';

// this is what I would like to import
//import { RemoteInterpreter } from '../remote_interpreter';


console.log("hello from worker", add(30, 12));

// XXX: I think that if we do this, the code for logger is included/loaded
// twice? One in pyscript.js and one in worker_interpreter.js?
import { getLogger } from '../logger';
import { RemoteInterpreter } from '../remote_interpreter';

const logger = getLogger('worker/interpreter');

logger.info("Starting...");

// XXX we should pin a version
importScripts("https://cdn.jsdelivr.net/npm/synclink");

// XXX we should use the URL which comes from the config
importScripts("https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js");

async function worker_initialize() {
    logger.info("loading pyodide...");
    const pyodide = await loadPyodide();
    logger.info("pyodide loaded");

    const remote_interpreter = new RemoteInterpreter();

    pyodide.registerComlink(Synclink);
    //pyodide.registerJsModule("js_main", window_proxy);

    logger.info("worker_initialize() complete");
    return Synclink.proxy(remote_interpreter);
}

Synclink.expose(worker_initialize)

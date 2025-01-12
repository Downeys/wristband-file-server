// This file is temporarily serving the purpose of a logging framework.
// I need to research some Node logging frameworks/techniques before I can
// decide exactly how I want to implement it here.

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: Record<string, unknown>) => {
    if (object) {
        console.log(`[${getTimeStamp()}][INFO][${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStamp()}][INFO][${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: Record<string, unknown>) => {
    if (object) {
        console.warn(`[${getTimeStamp()}][WARN][${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}][WARN][${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: Record<string, unknown>) => {
    if (object) {
        console.error(`[${getTimeStamp()}][ERROR][${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}][ERROR][${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: Record<string, unknown>) => {
    if (object) {
        console.debug(`[${getTimeStamp()}][DEBUG][${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}][DEBUG][${namespace}] ${message}`);
    }
};

export default { info, warn, error, debug };

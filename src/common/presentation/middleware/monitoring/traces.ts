import zipkin, { BatchRecorder, jsonEncoder } from 'zipkin';
import { HttpLogger } from 'zipkin-transport-http';
import ClsContext from 'zipkin-context-cls';
import { Tracer } from 'zipkin';

const debug = 'undefined' !== typeof window ? window.location.search.indexOf('debug') !== -1 : process.env.DEBUG;

// Send spans to Zipkin asynchronously over HTTP
const zipkinBaseUrl = process.env.ZIPKIN_HOST ?? 'http://localhost:9411';

const httpLogger = new HttpLogger({
  endpoint: `${zipkinBaseUrl}/api/v2/spans`,
  jsonEncoder: jsonEncoder.JSON_V2,
});

function recorder(serviceName: string) {
  return debug ? debugRecorder(serviceName) : new BatchRecorder({ logger: httpLogger });
}

function debugRecorder(serviceName: string) {
  const logger: zipkin.Logger = {
    logSpan: (span) => {
      httpLogger.logSpan(span);
    },
  };

  const batchRecorder = new BatchRecorder({ logger });

  return batchRecorder;
}

const ctxImpl = new ClsContext('zipkin');
const localServiceName = 'node-backend';
export const zipkinTracer = new Tracer({ ctxImpl, recorder: recorder(localServiceName), localServiceName });

export default zipkinTracer;

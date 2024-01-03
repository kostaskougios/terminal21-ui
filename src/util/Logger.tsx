enum LogLevels {
  NONE = 0,
  ERROR,
  WARN,
  INFO,
}

// Set the default log level
let currentLogLevel: LogLevels = LogLevels.ERROR;

// Custom logger interface
interface Logger {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

// Logger factory function
export default function LoggerFactory(component: any): Logger {
  return {
    info: (...args: any[]): void => {
      if (currentLogLevel >= LogLevels.INFO) {
        console.log({ details: { src: component, time: new Date() } }, ...args);
      }
    },
    warn: (...args: any[]): void => {
      if (currentLogLevel >= LogLevels.WARN) {
        console.warn(component, ...args);
      }
    },
    error: (...args: any[]): void => {
      if (currentLogLevel >= LogLevels.ERROR) {
        console.error(component, ...args);
      }
    },
  };
}

import { UserWhereUniqueInput } from '@creation-mono/shared/types';
import { Request } from 'express';

export enum LogLevel {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export enum EventType {
  AUTHENTICATION_LOGIN_SUCCESS = 'AuthenticationLoginSuccess',
  AUTHENTICATION_LOGIN_FAILURE = 'AuthenticationLoginFailure',
  AUTHORIZATION_FAILURE = 'AuthorizationFailure',
  EXCESS_RATE_LIMIT_EXCEEDED = 'ExcessRateLimitExceeded',
  INPUT_VALIDATION_FAILURE = 'InputValidationFailure',
}

export interface ILogEvent {
  datetime: string;
  appId: string;
  event: EventType;
  level: LogLevel;
  description: string;
  userAgent: string;
  sourceIp: string;
  hostname: string;
  // requestGraphql: string;
  port: string;
  requestURI: string;
  protocol: string;
  userId: string;
}

export class LogEvent implements ILogEvent {
  constructor(request: Request) {
    this.datetime = new Date().toISOString();
    this.appId = 'WalletDB.Backend';
    this.level = LogLevel.INFO;
    this.userAgent = request.headers['user-agent'];
    // this.requestGraphql = JSON.stringify(request.body);
    this.sourceIp = request.ip;
    this.protocol = request.protocol;
    this.requestURI = request.url;
    this.hostname = request.hostname;
    this.userId =
      request.user &&
      (request.user['email'] || request.user['username'] || request.user['id']);
  }

  public log() {
    return JSON.stringify(this, undefined, 2);
  }

  userId: string;
  hostname: string;
  port: string;
  requestURI: string;
  protocol: string;
  datetime: string;
  appId: string;
  event: EventType;
  level: LogLevel;
  description: string;
  userAgent: string;
  sourceIp: string;
  // requestGraphql: string;
}

export class AuthenticationLoginSuccess extends LogEvent {
  constructor(request: Request) {
    super(request);
    this.description = `User ${this.userId} login successfully.`;
    this.event = EventType.AUTHENTICATION_LOGIN_SUCCESS;
  }
}
export class AuthenticationLoginFailure extends LogEvent {
  // get user from request.body
  constructor(request: Request, user: UserWhereUniqueInput) {
    super(request);
    this.userId = user.email || user.username || user.id;
    this.description = `User ${this.userId} login failed.`;
    this.event = EventType.AUTHENTICATION_LOGIN_FAILURE;
    this.level = LogLevel.WARNING;
  }
}
export class AuthorizationFailure extends LogEvent {
  constructor(request: Request) {
    super(request);
    this.description = `User ${this.userId} attempted to access a resource without entitlement.`;
    this.event = EventType.AUTHORIZATION_FAILURE;
    this.level = LogLevel.CRITICAL;
  }
}
export class ExcessRateLimitExceeded extends LogEvent {
  constructor(request: Request) {
    super(request);
    this.description = `User ${this.userId} has exceeded max:${process.env.THROTTLE_LIMIT} for a interval of ${process.env.THROTTLE_TTL} milliseconds.`;
    this.event = EventType.EXCESS_RATE_LIMIT_EXCEEDED;
    this.level = LogLevel.WARNING;
  }
}
export class InputValidationFailure extends LogEvent {
  constructor(request: Request) {
    super(request);
    this.description = `User ${this.userId} submitted data that failed validation.`;
    this.event = EventType.INPUT_VALIDATION_FAILURE;
    this.level = LogLevel.WARNING;
  }
}

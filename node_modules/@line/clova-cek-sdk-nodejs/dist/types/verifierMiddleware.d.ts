import express from 'express';
import Clova from './types';
export default function verifierMiddleware(config: Clova.MiddlewareOptions): (req: express.Request, res: express.Response, next: express.NextFunction) => void;

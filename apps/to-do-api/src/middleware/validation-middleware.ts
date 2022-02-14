import express from 'express';
import { z } from 'zod';

export enum HttpDataSource {
    Body = 'body',
    Route = 'route',
    Query = 'query',
    Session = 'session',
    Params = 'params',
}

interface IHttpDataSourceProps {
    source: HttpDataSource;
    spread: boolean;
}

export const setDataSource = (
    source: HttpDataSource,
    spread = true
): IHttpDataSourceProps => ({
    source,
    spread,
});

const middleware = <T extends z.ZodType<unknown>>(
    schema: T,
    ...dataSources: IHttpDataSourceProps[]
): express.RequestHandler => {
    if (!dataSources?.length) {
        throw new Error(
            'Invalid configuration of validation middleware. No data source(s) specified.'
        );
    }
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void | express.Response> => {
        const data = getDataFromSources(req, dataSources);
        const validation = await schema.safeParseAsync(data);
        if (!validation.success) {
            return res.status(400).send(validation.error.errors);
        }
        req.validatedData = validation.data;
        return next();
    };
};

export default middleware;
const getDataFromSources = (
    req: express.Request,
    sourceConfigs: IHttpDataSourceProps[]
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = {};
    sourceConfigs.forEach((config) => {
        const moreData = req[config.source];
        if (config.spread) {
            data = { ...data, ...moreData };
        } else {
            data = { ...data, [config.source]: moreData };
        }
    });
    return data;
};

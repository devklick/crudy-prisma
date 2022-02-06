export type Success<T> = {
	success: true;
	data: T;
};

export type Failed = {
	success: false;
	errors: string[];
};
export type Result<T> = Success<T> | Failed;

export type Create<TIn, TOut> = (item: TIn) => Promise<Result<TOut>>;

export type Update<TIn, TOut> = (item: TIn) => Promise<Result<TOut>>;

export type Get<TOut> = (id: number) => Promise<Result<TOut>>;

export type Find<TOut> = (query: Partial<TOut>) => Promise<Result<TOut[]>>;

export const success = <T>(data: T): Success<T> => ({
	success: true,
	data,
});

export const failed = (...errors: string[]): Failed => ({
	success: false,
	errors,
});

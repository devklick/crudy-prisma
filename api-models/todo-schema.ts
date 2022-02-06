import { z } from 'zod';
import { StatusIds } from '../db/data/seed/status.seed';
import { zDate, zRouteNumericId } from './common-types';
import { userSessionDetailSchema } from './user-session-schema';

const id = z.number().int();
const createdOn = zDate();
const updatedOn = zDate().optional().nullable();
const title = z.string().nonempty().max(64);
const description = z.string().max(256).optional().nullable();
const deadline = zDate().optional().nullable();
const status = z.nativeEnum(StatusIds);
const createdById = z.number().int();
const assignedToId = z.number().int();
const userSession = userSessionDetailSchema;

export const todoCreateSchema = z.object({
	title,
	description,
	deadline,
	status,
	// Only an authenticated user can create a todo item, so we expect a user session.
	// This is taken care of by the session-middleware.
	userSession,

	// This is optional when creating a todo item.
	// If it's not specified, the todo item will automatically be assigned to the authenticated user.
	assignedToId: assignedToId.optional(),
});

export const todoDetailSchema = z.object({
	id,
	createdOn,
	updatedOn,
	title,
	description,
	deadline,
	status,
	createdById,
	assignedToId,
});

export const todoGetSchema = z.object({
	id: zRouteNumericId(),
	// Only an authenticated user can create a todo item, so we expect a user session.
	// This is taken care of by the session-middleware.
	userSession,
});

export const todoUpdateSchema = z
	.object({
		id,
		title,
		description,
		deadline,
		status,
		createdById,
		assignedToId,
	})
	.partial({
		title: true,
		description: true,
		deadline: true,
		status: true,
		createdById: true,
		assignedToId: true,
	});

export type TodoCreateType = z.infer<typeof todoCreateSchema>;
export type TodoUpdateType = z.infer<typeof todoUpdateSchema>;
export type TodoDetailType = z.infer<typeof todoDetailSchema>;

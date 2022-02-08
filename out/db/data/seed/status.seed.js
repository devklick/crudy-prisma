"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.StatusIds = void 0;
// TODO: Consider maing this a DB enum using prisma
var StatusIds;
(function (StatusIds) {
    StatusIds[StatusIds["ToDo"] = 0] = "ToDo";
    StatusIds[StatusIds["InProgress"] = 1] = "InProgress";
    StatusIds[StatusIds["Complete"] = 2] = "Complete";
    StatusIds[StatusIds["Parked"] = 3] = "Parked";
    StatusIds[StatusIds["Abandoned"] = 4] = "Abandoned";
})(StatusIds = exports.StatusIds || (exports.StatusIds = {}));
;
const seed = async (prisma) => {
    await prisma.status.upsert({
        create: {
            name: "To Do",
            description: "The task is known but is still be started",
            id: StatusIds.ToDo,
        },
        where: {
            name: "To Do"
        },
        update: {},
    });
    await prisma.status.upsert({
        create: {
            name: "In Progress",
            description: "The task is currently being worked on",
            id: StatusIds.InProgress,
        },
        where: {
            name: "In Progress"
        },
        update: {},
    });
    await prisma.status.upsert({
        create: {
            name: "Complete",
            description: "The task has been worked on and is now complete",
            id: StatusIds.Complete,
        },
        where: {
            name: "Complete"
        },
        update: {},
    });
    await prisma.status.upsert({
        create: {
            name: "Parked",
            description: "The task has been put aside until a later date",
            id: StatusIds.Parked,
        },
        where: {
            name: "Parked"
        },
        update: {},
    });
    await prisma.status.upsert({
        create: {
            name: "Abandoned",
            description: "The task has been put aside and is not planned to be worked in in the future",
            id: StatusIds.Abandoned,
        },
        where: {
            name: "Abandoned"
        },
        update: {},
    });
};
exports.seed = seed;
//# sourceMappingURL=status.seed.js.map
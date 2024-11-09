import {
    pgTable,
    text,
    timestamp,
    integer,
    boolean,
    uuid,
    json,
    pgEnum
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// Enums
export const cohortStatusEnum = pgEnum("cohort_status", [
    "in-progress",
    "starting-soon",
    "completed"
])

// Communities Table
export const communities = pgTable("communities", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    logo: text("logo").notNull(),
    description: text("description").notNull(),
    language: text("language").notNull(),
    timezone: text("timezone").notNull(),
    totalAlumni: integer("total_alumni").default(0),
    nextCohortDate: timestamp("next_cohort_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Cohorts Table
export const cohorts = pgTable("cohorts", {
    id: uuid("id").primaryKey().defaultRandom(),
    communityId: uuid("community_id")
        .notNull()
        .references(() => communities.id),
    number: integer("number").notNull(),
    students: integer("students").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    status: cohortStatusEnum("status").default("starting-soon"),
    progress: integer("progress").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Groups Table
export const groups = pgTable("groups", {
    id: uuid("id").primaryKey().defaultRandom(),
    cohortId: uuid("cohort_id")
        .notNull()
        .references(() => cohorts.id),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Chaperons Table
export const chaperons = pgTable("chaperons", {
    id: uuid("id").primaryKey().defaultRandom(),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id),
    name: text("name").notNull(),
    expertise: text("expertise").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Students Table
export const students = pgTable("students", {
    id: uuid("id").primaryKey().defaultRandom(),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Weekly Data Table
export const weeklyData = pgTable("weekly_data", {
    id: uuid("id").primaryKey().defaultRandom(),
    cohortId: uuid("cohort_id")
        .notNull()
        .references(() => cohorts.id),
    weekNumber: integer("week_number").notNull(),
    topic: text("topic").notNull(),
    topicSlug: text("topic_slug").notNull(),
    objectives: json("objectives").$type<string[]>().notNull(),
    completed: boolean("completed").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Resources Table
export const resources = pgTable("resources", {
    id: uuid("id").primaryKey().defaultRandom(),
    weeklyDataId: uuid("weekly_data_id")
        .notNull()
        .references(() => weeklyData.id),
    title: text("title").notNull(),
    type: text("type").notNull(),
    link: text("link").notNull(),
    completed: boolean("completed").default(false),
    parentTopic: text("parent_topic"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Questions Table
export const questions = pgTable("questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    weeklyDataId: uuid("weekly_data_id")
        .notNull()
        .references(() => weeklyData.id),
    text: text("text").notNull(),
    relatedMaterial: text("related_material").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Question Assignments Table
export const questionAssignments = pgTable("question_assignments", {
    id: uuid("id").primaryKey().defaultRandom(),
    questionId: uuid("question_id")
        .notNull()
        .references(() => questions.id),
    studentId: uuid("student_id")
        .notNull()
        .references(() => students.id),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Weekly Calls Table
export const weeklyCalls = pgTable("weekly_calls", {
    id: uuid("id").primaryKey().defaultRandom(),
    weeklyDataId: uuid("weekly_data_id")
        .notNull()
        .references(() => weeklyData.id),
    date: timestamp("date").notNull(),
    discordLink: text("discord_link").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Group Assignments Table (for deputies)
export const groupAssignments = pgTable("group_assignments", {
    id: uuid("id").primaryKey().defaultRandom(),
    weeklyDataId: uuid("weekly_data_id")
        .notNull()
        .references(() => weeklyData.id),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id),
    deputyId: uuid("deputy_id")
        .notNull()
        .references(() => students.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

// Relations
export const communitiesRelations = relations(communities, ({ many }) => ({
    cohorts: many(cohorts)
}))

export const cohortsRelations = relations(cohorts, ({ one, many }) => ({
    community: one(communities, {
        fields: [cohorts.communityId],
        references: [communities.id]
    }),
    groups: many(groups),
    weeklyData: many(weeklyData)
}))

export const groupsRelations = relations(groups, ({ one, many }) => ({
    cohort: one(cohorts, {
        fields: [groups.cohortId],
        references: [cohorts.id]
    }),
    chaperon: one(chaperons),
    students: many(students),
    questionAssignments: many(questionAssignments)
}))

export const chaperonsRelations = relations(chaperons, ({ one }) => ({
    group: one(groups, {
        fields: [chaperons.groupId],
        references: [groups.id]
    })
}))

export const studentsRelations = relations(students, ({ one, many }) => ({
    group: one(groups, {
        fields: [students.groupId],
        references: [groups.id]
    }),
    questionAssignments: many(questionAssignments),
    groupAssignments: many(groupAssignments, {
        relationName: "deputy"
    })
}))

export const weeklyDataRelations = relations(weeklyData, ({ one, many }) => ({
    cohort: one(cohorts, {
        fields: [weeklyData.cohortId],
        references: [cohorts.id]
    }),
    resources: many(resources),
    questions: many(questions),
    weeklyCalls: many(weeklyCalls),
    groupAssignments: many(groupAssignments)
}))

export const resourcesRelations = relations(resources, ({ one }) => ({
    weeklyData: one(weeklyData, {
        fields: [resources.weeklyDataId],
        references: [weeklyData.id]
    })
}))

export const questionsRelations = relations(questions, ({ one, many }) => ({
    weeklyData: one(weeklyData, {
        fields: [questions.weeklyDataId],
        references: [weeklyData.id]
    }),
    assignments: many(questionAssignments)
}))

export const questionAssignmentsRelations = relations(
    questionAssignments,
    ({ one }) => ({
        question: one(questions, {
            fields: [questionAssignments.questionId],
            references: [questions.id]
        }),
        student: one(students, {
            fields: [questionAssignments.studentId],
            references: [students.id]
        }),
        group: one(groups, {
            fields: [questionAssignments.groupId],
            references: [groups.id]
        })
    })
)

export const weeklyCallsRelations = relations(weeklyCalls, ({ one }) => ({
    weeklyData: one(weeklyData, {
        fields: [weeklyCalls.weeklyDataId],
        references: [weeklyData.id]
    })
}))

export const groupAssignmentsRelations = relations(
    groupAssignments,
    ({ one }) => ({
        weeklyData: one(weeklyData, {
            fields: [groupAssignments.weeklyDataId],
            references: [weeklyData.id]
        }),
        group: one(groups, {
            fields: [groupAssignments.groupId],
            references: [groups.id]
        }),
        deputy: one(students, {
            fields: [groupAssignments.deputyId],
            references: [students.id]
        })
    })
)

// Add all Zod schemas for validation
export const insertCommunitySchema = createInsertSchema(communities)
export const selectCommunitySchema = createSelectSchema(communities)

export const insertCohortSchema = createInsertSchema(cohorts)
export const selectCohortSchema = createSelectSchema(cohorts)

export const insertGroupSchema = createInsertSchema(groups)
export const selectGroupSchema = createSelectSchema(groups)

export const insertChaperonSchema = createInsertSchema(chaperons)
export const selectChaperonSchema = createSelectSchema(chaperons)

export const insertStudentSchema = createInsertSchema(students)
export const selectStudentSchema = createSelectSchema(students)

export const insertWeeklyDataSchema = createInsertSchema(weeklyData)
export const selectWeeklyDataSchema = createSelectSchema(weeklyData)

export const insertResourceSchema = createInsertSchema(resources)
export const selectResourceSchema = createSelectSchema(resources)

export const insertQuestionSchema = createInsertSchema(questions)
export const selectQuestionSchema = createSelectSchema(questions)

export const insertQuestionAssignmentSchema =
    createInsertSchema(questionAssignments)
export const selectQuestionAssignmentSchema =
    createSelectSchema(questionAssignments)

export const insertWeeklyCallSchema = createInsertSchema(weeklyCalls)
export const selectWeeklyCallSchema = createSelectSchema(weeklyCalls)

export const insertGroupAssignmentSchema = createInsertSchema(groupAssignments)
export const selectGroupAssignmentSchema = createSelectSchema(groupAssignments)

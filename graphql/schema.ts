import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLNamedType } from 'graphql/type';

import { asNexusMethod, makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'
export const GQLDate = asNexusMethod(GraphQLDateTime as unknown as GraphQLNamedType, 'date')
export const schema = makeSchema({
  types: [types, GQLDate],
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
})
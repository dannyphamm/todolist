import { Vote } from './Vote';
import { Subreddit } from './Subreddit';
import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { Comment } from './Comment';
import { GraphQLEnumType, GraphQLNonNull } from 'graphql';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.date('updatedAt')
    t.string('title')
    t.string('body')
    t.string('image')
    t.string('username')
    t.int('subredditId')
    t.field('subreddit', {
      type: Subreddit,
      resolve(parent, _args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: parent.id as number,
          },
        }).subreddit()
      }
    });
    t.list.field('comments', {
      type: Comment,
      resolve(parent, _args, ctx) {
        return ctx.prisma.comment.findMany({
          where: {
            postId: parent.id as number,
          },
        });
      }
    })
    t.list.field('votes', {
      type: Vote,
      resolve(parent, _args, ctx) {
        return ctx.prisma.vote.findMany({
          where: {
            postId: parent.id as number,
          },
        });
      }
    })
  }
})

export const getAllPostByTopicQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allPostListByTopic', {
      type: Post,
      args: {
        topic: nonNull(stringArg())
      },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany(
          {
            where: {
              subreddit: {
                topic: _args.topic
              }
            },
            orderBy: {
              createdAt: 'desc',
            },
          }
        )
      },
    })
  },
})

export const getAllPostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allPostList', {
      type: Post,
      args: {
          
      },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany(
          {
            orderBy: {
              createdAt: 'desc',
            }
          }
        )
      },
    })
  },
})

export const PostsQueryById = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('postsById', {
      type: Post,
      args: {
        id: nonNull(intArg())
      },
      resolve(_parent, args, ctx) {
        const link = ctx.prisma.post.findMany({
          where: {
            id: args.id,
          },
        });
        return link;
      },
    });
  },
});

// create subreddit
export const CreatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: Post,
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
        image: stringArg(),
        username: nonNull(stringArg()),
        subredditId: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const newLink = {
          title: args.title,
          body: args.body,
          image: args.image,
          username: args.username,
          subredditId: args.subredditId,
        };

        return await ctx.prisma.post.create({
          data: newLink,
        });
      },
    });
  },
});
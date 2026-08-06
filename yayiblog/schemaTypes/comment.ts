import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',

  fields: [
    defineField({
      name: 'approved',
      title: 'Visible on website',
      type: 'boolean',
      description:
        'Comments go live immediately. Switch this off to hide one, or delete the document to remove it for good.',
      initialValue: true,
    }),

    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'text',
      title: 'Comment',
      type: 'text',
      rows: 5,
      readOnly: true,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      readOnly: true,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      name: 'name',
      text: 'text',
      approved: 'approved',
      post: 'post.title',
    },
    prepare({name, text, approved, post}) {
      return {
        title: `${approved ? '✅' : '🕓'}  ${name}`,
        subtitle: `${post ? `${post} — ` : ''}${text}`,
      }
    },
  },
})

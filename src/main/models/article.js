import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema({
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: [true, 'Slug has to be unique']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

articleSchema.methods.toDto = function () {
  return {
    author: this.author,
    slug: this.slug,
    title: this.title,
    content: this.content,
  }
}

module.exports = mongoose.model('Article', articleSchema)

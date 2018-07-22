const expect = require('chai').expect,
  Article = require('../../main/models/article')

describe('test article', () => {

  it('should throw error on empty article', (done) => {
    // given
    let article = new Article()

    // when / then
    article.validate((err) => {
      expect(err.errors).to.include.all.keys(
        'author',
        'slug',
        'title',
        'content')
    })

    // finally
    done()
  })

  it('should successfully validate a valid article', (done) => {
    // given
    let article = new Article({
        author: 'author',
        slug: 'some-title',
        title: 'Some Title',
        content: 'Some content'
      }
    )

    // when / then
    article.validate((err) => {
      expect(err).to.be.null
    })

    // finally
    done()
  })

  it('should convert to dto', (done) => {
    // given
    const author = 'author'
    const slug = 'some-title'
    const title = 'Some Title'
    const content = 'Some content'

    const article = new Article({
      author,
      slug,
      title,
      content
    })

    // when
    let result = article.toDto()

    // then
    expect(result.author).to.be.equal(author)
    expect(result.slug).to.be.equal(slug)
    expect(result.title).to.be.equal(title)
    expect(result.content).to.be.equal(content)

    // finally
    done()
  })
})
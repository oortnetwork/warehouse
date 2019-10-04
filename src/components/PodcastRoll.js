import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import './main.css'
import Img from 'gatsby-image'


class PodcastRoll extends React.Component {

  state = {
    activePodcast: {},
    showPodcastDetail: false,
    id: null,
  }

  openPodcast = (podcast) => {
    podcast &&
    window.history.pushState(
      {page: 1},
      podcast.frontmatter.title,
      `?podcast=${podcast.frontmatter.title}`
    );
    if (podcast !== !!this.state.activePodcast) {
      this.setState(
        {
          activePodcast: podcast,
          showPodcastDetail: !this.state.showPodcastDetail,
        }
      );
    }
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div className="wrapper">
        <div className="article-list">
          {posts &&
            posts.map(({ node: post }) => (
              <div key={post.id}>
                <article
                  onClick={() =>this.openPodcast(post)}
                  className={`blog-list-item tile is-child`}
                >
                  <header>
                    <p className="post-meta">
                      {/* <Link
                        className="title has-text-primary is-size-4"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link> */}
                      {/* <span> &bull; </span> */}
                      <span className="subtitle is-size-5 is-block">
                        {post.frontmatter.date}
                      </span>
                        {post.frontmatter.location}
                    </p>
                  </header>

                </article>
              </div>
            ))}
      </div>

      {this.state.showPodcastDetail && (
          <div className="article-detail">
            <h2 className="article-detail-title">{this.state.activePodcast.frontmatter.title}</h2>
            {this.state.activePodcast.frontmatter.image &&
              <div className="article-image-wrapper">
                <Img className ="article-detail-image" fluid={this.state.activePodcast.frontmatter.image.childImageSharp.fluid} />
              </div>
            }
            <iframe title={this.state.activePodcast.id} width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.state.activePodcast.frontmatter.podcastURL + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}></iframe>
            <p className="post-detail-description">{this.state.activePodcast.frontmatter.description}</p>
            <p className="post-detail-description">{this.state.activePodcast.frontmatter.body}</p>
          </div>
      )}
      </div>
    )
  }
}

PodcastRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PodcastRollQuerry {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "podcast-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                location
                description
                podcastURL
                image {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PodcastRoll data={data} count={count} />}
  />
)

import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import Seo from "../components/seo"

const ArticleLink = styled(Link)`
	width: 100%;
	height: 100%;
	padding: 20px;
	border-bottom: 1px solid #D2D2D2;
	display: flex;
	flex-direction: column;
	gap: 4px;
	transition: padding .3s;
	text-decoration: none;
	&:hover {
		padding-left: 30px;
		padding-right: 10px;
		header span {
			color: #6E71C9;
		}
		section p {
			color: #6E71C9;
		}
	}
`

const Category = styled.p`
	font-size: 14px;
	line-height: 1.2;
	color: #888888;
	font-weight: 300;
	margin: 0;
	padding: 0;
`

const ArticleHeader = styled.header`
	h2 {
		padding: 4px 0;
		margin: 0;
		span {
			font-size: 28px;
			line-height: 1.2;
			font-weight: 600;
			color: #222222;
			transition: color .3s;
		}
	}
`

const ArticleSection = styled.section`
	p {
		margin: 0;
		padding: 4px 0;
		font-size: 18px;
		line-height: 1.2;
		color: #888888;
		font-weight: 400;
		transition: color .3s;
	}
`

const ArticleDate = styled.p`
	font-size: 14px;
	line-height: 1.2;
	color: #888888;
	margin: 0;
	padding: 4px 0;
`

const BlogIndex = ({ data }) => {
	const [mouseover, setMouseover] = React.useState(false)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle}>
        <Seo title="All posts" />
        <p>게시글이 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout title={siteTitle}>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none`, padding: 0, margin: 0 }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
								<ArticleLink
									onMouseEnter={() => setMouseover(true)}
									onMouseLeave={() => setMouseover(false)}
									to={post.fields.slug}
									itemProp="url"
								>
									<Category>{post.frontmatter.category}</Category>
									<ArticleHeader isMouseUp={mouseover}>
										<h2><span itemProp="headline">{title}</span></h2>
									</ArticleHeader>
									<ArticleSection isMouseUp={mouseover}>
										<p
											dangerouslySetInnerHTML={{
												__html: post.frontmatter.description || post.excerpt,
											}}
											itemProp="description"
										/>
									</ArticleSection>
									<ArticleDate>{post.frontmatter.date}</ArticleDate>
								</ArticleLink>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
					category
        }
      }
    }
  }
`

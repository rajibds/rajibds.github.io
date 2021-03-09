/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            linkedIn
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      {/*
      TODO
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      /> */}
      {author?.name && (
        <div className="bio-details">
          <p>
            <strong>{author.name}</strong>, {author?.summary || null}
          </p>
          <div className="bio-details__social-media">
            <a href={`https://github.com/${social?.github || ``}`}>Github</a>,{" "}
            {""}
            <a href={`https://linkedin.com/in/${social?.linkedIn || ``}`}>
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import "./main.css";
import DivOverlay from "./DivOverlay";
import {
	renderHtmlToReact,
	useMedia,
	imagesFromAst,
	relayout,
	useWindowSize,
	renderImg,
	removeImg,
	useSetDivBg,
	useChangeMagicLogo,
	useSetShiftRatio
} from "./utils";
import FocusDetail from "./FocusDetail";

const FocusRoll = ({
	data: {
		allMarkdownRemark: { edges: posts }
	}
}) => {
	const [activeFocus, setActiveFocus] = useState(null);
	const [showFocusDetail, setShowFocusDetail] = useState(false);
	const articleRef = useRef();
	const match = useMedia("(max-width: 900px) ");
	const [divStyle, setDivStyle] = useState({ backgroundColor: "black" });
	const size = useWindowSize();
	const shift = useSetShiftRatio();
	useEffect(() => {
		shift;
	}, []);
	const openFocus = focus => {
		const isClient = typeof window === "object";
		if (isClient && articleRef.current) {
			articleRef.current.scrollTo(0, 0);
		}
		focus &&
			focus.fields &&
			window.history.pushState(
				{ page: 1 },
				focus.frontmatter.title,
				focus.fields.slug
			);

		setActiveFocus(focus);
		setShowFocusDetail(true);
	};

	// CHANGING LOGO COLOR
	useEffect(() => {
		useSetDivBg(setDivStyle);
	}, [size]);

	useEffect(() => {
		useChangeMagicLogo();
	}, []);

	useEffect(() => {
		posts &&
			posts.map(post => {
				if (post.node.fields.slug === window.location.pathname) {
					setActiveFocus(post.node);
					setShowFocusDetail(true);
					return;
				}
			});
	}, []);
	return (
		<>
			<DivOverlay currImg={divStyle} />
			<div className="wrapper">
				<div className="article-list">
					{posts &&
						posts.map(({ node: post }) => (
							<article
								key={post.id}
								onClick={() => openFocus(post)}
								className={`blog-list-item post ${
									post === activeFocus ? "selected" : ""
								}`}
								onPointerEnter={() =>
									renderImg(post, setDivStyle, size)
								}
								onPointerLeave={() => removeImg(setDivStyle)}
							>
								<h2 className="post-type">Focus</h2>
								<header>
									<p className="post-meta">
										{post.frontmatter.title}
									</p>
									<h2 className="post-meta">
										{post.frontmatter.date}
									</h2>
									<h2>By {post.frontmatter.author}</h2>
								</header>
							</article>
						))}
					{!posts && <h1>No Focus To Show ... Yet</h1>}
				</div>

				{showFocusDetail && (
					<FocusDetail
						onSetActiveFocus={setActiveFocus}
						onSetShowFocusDetail={setShowFocusDetail}
						renderHtmlToReact={renderHtmlToReact}
						match={match}
						articleRef={articleRef}
						activeFocus={activeFocus}
					/>
				)}
			</div>
		</>
	);
};

FocusRoll.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
};

export default () => (
	<StaticQuery
		query={graphql`
			query FocusRollQuerry {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: {
						frontmatter: { templateKey: { eq: "focus-page" } }
					}
				) {
					edges {
						node {
							htmlAst
							id
							fields {
								slug
							}
							frontmatter {
								title
								templateKey
								author
								date(formatString: "MMMM DD, YYYY")
								content {
									type
									image {
										publicURL
										childImageSharp {
											fluid(maxWidth: 1440, quality: 90) {
												...GatsbyImageSharpFluid_withWebp_tracedSVG
											}
										}
									}
									caption
									body
								}
								PDF {
									publicURL
								}
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <FocusRoll data={data} count={count} />}
	/>
);

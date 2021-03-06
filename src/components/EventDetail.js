import React from "react";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import CloseButton from "./CloseButton";
import FluidImage from "./FluidImage";

const EventDetail = ({
	match,
	activeEvent,
	onSetActiveEvent,
	onSetShowEventDetail,
	title,
	content,
	location,
	date,
	image,
	getAsset,
	articleRef,
	entry
}) => {
	return (
		<div
			ref={articleRef}
			className={`article-detail ${match ? `mobile` : ``}`}
		>
			<CloseButton
				onSetActiveEvent={onSetActiveEvent}
				onSetShowEventDetail={onSetShowEventDetail}
			/>

			<h2 className="article-detail-title">
				{activeEvent
					? activeEvent.frontmatter.title
					: title
					? title
					: ""}
			</h2>
			<section className="content">
				{((activeEvent && activeEvent.frontmatter.content) || []).map(
					el => {
						if (el.type === "images") {
							return (
								<>
									{el.image && (
										<FluidImage image={el.image} />
									)}
									<p className="caption">
										{el.caption ? el.caption : ""}
									</p>
								</>
							);
						} else {
							return (
								<ReactMarkdown
									linkTarget={"_blank"}
									escapeHtml={false}
									source={el.body}
								/>
							);
						}
					}
				)}
			</section>
			<section className="content">
				{!activeEvent &&
					content &&
					content.map(el => {
						if (el.type === "images") {
							return (
								<>
									<img src={getAsset(el.image)} alt="" />
									<p className="caption">{el.caption}</p>
								</>
							);
						} else if (el.type === "text") {
							return (
								<ReactMarkdown
									escapeHtml={false}
									source={el.body}
								/>
							);
						}
					})}
			</section>
		</div>
	);
};

export default EventDetail;

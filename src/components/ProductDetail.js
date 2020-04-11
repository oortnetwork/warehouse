import React from "react";
import CloseButton from "./CloseButton";
import ReactMarkdown from "react-markdown";
import FluidImage from "./FluidImage";

const ProductDetail = ({
	onSetActiveProduct,
	onSetShowProductDetail,
	renderHtmlToReact,
	match,
	articleRef,
	activeProduct,
	title,
	content,
	getAsset
}) => {
	return (
		<div
			ref={articleRef}
			className={`article-detail ${match ? `mobile` : ``}`}
		>
			<CloseButton
				onSetActiveEvent={onSetActiveProduct}
				onSetShowEventDetail={onSetShowProductDetail}
			/>

			<h2 className="article-detail-title">
				{activeProduct
					? activeProduct.frontmatter.title
					: title
					? title
					: ""}
			</h2>
			<section className="content">
				{(
					(activeProduct && activeProduct.frontmatter.content) ||
					[]
				).map(el => {
					if (el.type === "images") {
						return (
							<>
								{" "}
								{el.image ? (
									<FluidImage image={el.image} />
								) : (
									<img src={el.image} alt="" />
								)}
								<p className="caption">
									{el.caption ? el.caption : ""}
								</p>
							</>
						);
					} else {
						return (
							<>
								<p className="bodyText">
									<ReactMarkdown
										escapeHtml={false}
										source={el.body}
									/>
								</p>
							</>
						);
					}
				})}
			</section>
			<section className="content">
				{activeProduct
					? renderHtmlToReact(activeProduct.htmlAst)
					: (content || []).map(el => {
							if (el.type === "images") {
								return (
									<>
										<img src={getAsset(el.image)} alt="" />
										<p className="caption">{el.caption}</p>
									</>
								);
							} else if (el.type === "text") {
								return (
									<>
										<p className="bodyText">
											<ReactMarkdown
												escapeHtml={false}
												source={el.body}
											/>
										</p>
									</>
								);
							}
					  })}
			</section>
			<p>Webshop coming soon..</p>
		</div>
	);
};

export default ProductDetail;
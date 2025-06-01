import { Children, cloneElement } from "react"

const CinematicText = ({
  children,
  className,
  element = "h2",
  delay = 0,
  direction = "up",
  staggerChildren = 0.03,
  color = "#231f20",
  highlightColor = "#3fbfbc",
  highlightWords = [],
}) => {
  const renderContent = () => {
    if (typeof children === "string") {
      const words = children.split(" ")
      return words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word.toLowerCase())
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: "translateY(100%)",
                color: isHighlighted ? highlightColor : color,
              }}
            >
              {word}{" "}
            </span>
          </span>
        )
      })
    }

    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        style: {
          display: "inline-block",
          overflow: "hidden",
          position: "relative",
        },
        children: (
          <span
            style={{
              display: "inline-block",
              transform: "translateY(100%)",
            }}
          >
            {child.props.children}
          </span>
        ),
      })
    })
  }

  const Tag = element

  return (
    <Tag className={className} style={{ overflow: "hidden" }}>
      {renderContent()}
    </Tag>
  )
}

export default CinematicText

const { useState } = React

export function LongTxt({ txt, length = 100 }){
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p>
        {isExpanded ? txt : txt.slice(0, length) + (txt.length > length ? "..." : "")}
      </p>
      {txt.length > length && (
        <button onClick={toggleExpand} style={{ color: "blue" }}>
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};
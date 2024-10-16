import ParseNode from "@/configs/parse/parse-node";

export default async function TestParse() {
  const IdeaClass = await ParseNode.Object.extend("ideas");

  const query = new ParseNode.Query(IdeaClass);

  const res = await query.find();

  return (
    <ul>
      {res.map((item) => (
        <li key={item.id}>
          <p>{item.attributes.name}</p>
          <p>{item.attributes.desc}</p>
        </li>
      ))}
    </ul>
  );
}

import { Key } from "react";

export default async function ListTasksPage() {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos");

  const posts = await data.json();

  return (
    <div>
      <h2>List tasks</h2>
      <ul>
        {posts.map((post: { id: Key | null | undefined; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

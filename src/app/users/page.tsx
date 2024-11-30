import Buttons from "../components/Buttons";

async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export default async function UserPage() {
  const users = await getUsers();

  return (
    <div className="grid  gap-4 p-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {users.map((user: any) => (
        <div
          key={user.id}
          className="bg-indigo-950 p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
        >
          <div>
            <h2 className="text-indigo-200 text-lg font-bold">{user.name}</h2>
            <p className="text-indigo-500">{user.email}</p>
            <small className="text-indigo-300">{user.id}</small>
          </div>
          <Buttons typeButton="users" id={user.id} />
        </div>
      ))}
    </div>
  );
}

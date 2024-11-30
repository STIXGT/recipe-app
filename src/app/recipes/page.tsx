import Buttons from "../components/Buttons";

async function getRecipes() {
  const response = await fetch("http://localhost:3000/api/recipes");
  const data = await response.json();
  return data.recipes;
}

const deleteRecipe = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    method: "DELETE",
  });
  return response;
};
export default async function RecipePage() {
  const recipes = await getRecipes();
  console.log("ESTRUCTURA:", recipes);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4">
      {recipes.map((recipe: any) => (
        <main
          key={recipe.id}
          className="bg-orange-950 rounded-lg shadow-md p-4 flex justify-between items-center cursor-pointer"
        >
          <div>
            <h2 className="text-orange-200 text-lg font-bold mb-2">
              {recipe.title}
            </h2>
            <p className="text-orange-500 mb-2">{recipe.description}</p>
            <span className="text-sm text-orange-300 mt-2">
              Por: <strong>{recipe.user_name}</strong>
            </span>
          </div>
          <Buttons typeButton="recipes" id={recipe.id} />
        </main>
      ))}
    </div>
  );
}

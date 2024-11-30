import RecipeComponent from "./components/RecipeComponent";
import UserComponent from "./components/UserComponent";

export default function Home() {
  return (
    <div className="flex justify-center">
      <UserComponent />
      <RecipeComponent />
    </div>
  );
}

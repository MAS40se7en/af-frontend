import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user, isUserLoading } = useAuth();

  if (user) {
    console.log(user);
  }
  return (
    <div className="flex h-screen">
        <h1 className="m-auto text-4xl font-bold">Welcome to ArtFocused</h1>
    </div>
  )
}

export default Home
import CreateArtworkForm from "@/components/account/artworks/create-artwork-form"

function CreateArtwork() {
  return (
    <div className="w-full md:w-3/5 lg:w-4/5 mx-auto my-10 space-y-6">
      <h2 className="text-4xl font-semibold text-center">Create a new Artwork</h2>
        <CreateArtworkForm />
    </div>
  )
}

export default CreateArtwork
import EditArtworkForm from "@/components/account/artworks/edit-artwork-form"

const EditArtwork = () => {
  return (
    <div className="w-full md:w-3/5 lg:w-4/5 mx-auto my-10 space-y-6">
      <h2 className="text-4xl font-semibold text-center">Edit Artwork</h2>
        <EditArtworkForm />
    </div>
  )
}

export default EditArtwork
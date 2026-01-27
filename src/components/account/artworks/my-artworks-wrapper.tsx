import { useArtworks } from "@/hooks/use-artworks"
import NoElements from "@/components/no-elements";

function MyArtworksWrapper() {
    const { myArtworks, myArtworksError } = useArtworks();

    if (!myArtworks || myArtworksError) {
        return (
            <div>
                <p>Something went wrong while fetching your art works</p>
                {myArtworksError ? <p>{myArtworksError}</p> : ""}
            </div>
        )
    }


  return (
    <div className="my-8">
        {myArtworks?.length > 0 ? (
            <></>
        ) : (
            <NoElements 
                url="/create-artwork"
                text="You have no art works created! You can add a new one down here!"
                className=""
                objectName="Art works"
            />
        )}
    </div>
  )
}

export default MyArtworksWrapper
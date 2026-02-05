interface ImageModalProps {
  imageUrl: string;
}

const ImageModal = ({imageUrl}: ImageModalProps) => {
  return (
    <img 
    src={imageUrl} 
    alt="image" 
    className="w-full"
    />
  )
}

export default ImageModal
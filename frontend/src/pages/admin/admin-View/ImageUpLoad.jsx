import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon,FileIcon, XIcon} from "lucide-react";
import { ChatState } from "@/store/Context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ImageUpLoad = ({ imageFile, setimageFile, uploadImg, setUploadImg,isLoading, setisLoading, isEditMode }) => {
  const { user } = ChatState();
  const inputRef = useRef(null);

  const handelImageFile = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) setimageFile(selectedImage);
  };

  const handelDrag = (e) => {
    e.preventDefault();
  };

  const handelDrop = (e) => {
    e.preventDefault();
    const dropFile = e.dataTransfer.files?.[0];
    if (dropFile) setimageFile(dropFile);
  };

  const hadelRemoveFile = () => {
    setimageFile("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const productImageUpload = async () => {
    setisLoading(true)
    const data = new FormData();
    data.append("productFile", imageFile);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/productImg`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (res.data.success){
      setUploadImg(res.data.result.url);
      setisLoading(false)
    } 
  };

  useEffect(() => {
    if (imageFile !== ""){
      productImageUpload();
    } 
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4 "
        onDragOver={handelDrag}
        onDrop={handelDrop}
        onClick={() => {isEditMode ? toast.error("Not Allowed to update image") : ""} }
      >
        <Input
          className="hidden"
          id="imageupload"
          type="file"
          onChange={handelImageFile}
          ref={inputRef}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="imageupload"
            className="flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to Upload Image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile?.name}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-muted"
              onClick={hadelRemoveFile}
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpLoad

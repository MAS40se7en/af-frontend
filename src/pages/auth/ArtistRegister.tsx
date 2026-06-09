import ArtistRegisterForm from "@/components/auth/register/artist-register-form";
import type { registerFormSchema } from "@/lib/zod-schemas";
import { useLocation } from "react-router-dom"
import type z from "zod";

const ArtistRegister = () => {
  const location = useLocation();

  const values = location.state as z.infer<typeof registerFormSchema> || null;

  return (
    <div className="absolaute bottom-0 h-140 flex flex-col p-5 lg:pl-1 lg:mt-4 gap-7 md:w-100">
            <h2 className="text-lg px-3">Continue your Registration process as an Artist, <span className="font-semibold text-xl">{values.firstName} {values.lastName}</span>!</h2>
            <ArtistRegisterForm values={values} />
        </div>
  )
}

export default ArtistRegister
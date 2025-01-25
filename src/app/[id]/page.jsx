import { API, BACKEND, Btn, getData } from "@/utils/global";
import PageClient from "./PageClient";

export default async function page({ params }) {
   
   console.log(params?.id);
   
    return (
        <PageClient pa={params?.id} />
    );
}

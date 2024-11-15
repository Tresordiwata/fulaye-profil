"use client"
import { API, BACKEND, Btn, getData } from "@/utils/global";
import { Activity, Download, HomeIcon, LucideActivity, Mail, PhoneCall, User2, User2Icon, UserCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home({ params }) {
    const [profil, setProfil] = useState({})
    const [feedBack, setFeedBack] = useState("")
    const [articles,setArticles]=useState([])
    const [founded,setFounded]=useState("P");
    const { id } = params;

    const logowhatspp="data:image/jpeg;base64,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";
    const fulaye="https://fulaye.com/img/hers.png"
    useEffect(() => {
        setFeedBack(<div className="flex items-center justify-center text-2xl">Traitement en cours...</div>)
        getData("profilHashed&idProfil=" + params?.id).then((r) => {
            if (r?.data?.length == 0) {
                setFounded("N")
                setFeedBack(
                    <div className="flex justify-center items-center">
                        <div className="max-w-[95%] w-[95%] mt-10 py-4 px-4 p rounded-md flex justify-center items-center tetx-2xl text-red-800 bg-red-300 border border-red-600">
                            Desolé aucun profil ne correspond à votre ID
                        </div>
                    </div>
                )
            } else {
                setFounded("Y")
                setFeedBack("");
                setProfil(r?.data[0])
            }

        }).catch((err) => {
            console.log(err);

        })
        getData("articles&profil="+params?.id).then(r=>{
           setArticles(r?.data)
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="text-center border-b-4 border-green-400  w-full text-2xl h-56 to-green-800 via-green-400 from-white bg-gradient-to-r">
                <p className="text-white text-4xl h-full" style={{backgroundImage:`url(${fulaye})`, backgroundSize:"100%"}}>
                   
                </p>
                
            </div>

            <div className="flex ">
                {/* <div className="-mt-160 border-1 shadow-md h-44 w-44 lg:w-60 lg:h-60 bg-white ml-14 sm:w-28 sm:h-28 md:h-28 md:w-28 rounded-full"> */}
                    <img src={BACKEND+"imagesProfil/"+ profil?.photo || "./profil.png"} className=" rounded-full -mt-16 shadow-md w-44 h-44 ml-8 border-2 border-green-500" />
                {/* </div> */}
            </div>
            <div className="-mt-[110px] pt-32  w-full pl-10 bg-white pb-8">
                { founded=="Y" &&
                    <>
                        <div className="font-bold text-2xl pl-5 mt-3 flex items-center gap-2"><UserCircle size={20} strokeWidth={1} /> { profil?.profilNom}</div>
                        <div className="pl-5 mt-2 flex items-center gap-2"><LucideActivity size={20} strokeWidth={1} />{ profil?.profilTypeActivite}</div>
                        <div className="pl-5 mt-2">{ profil?.bio}</div>
                    </>
                }
                <div className="flex justify-center gap-4 mt-4">
                   <Btn text="Quitter" href={"https://www.fulaye.com"} />
                   {founded=="Y" &&
                   <Btn text={
                        <div className="flex gap-2 items-center justify-center">
                            <img src={logowhatspp} className="w-6 h-6 rounded-md" /> WhatsApp
                        </div>} 
                    bg={"bg-green-500"} 
                    href={profil?.whatsapp?`https://wa.me/${profil?.whatsapp}`:"#"+profil?.whatsapp}
                    /> }
                   
                </div>
                {feedBack}
            </div>
            <div className="mt-3 min-h-28 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                <div className="font-bold">Détail</div>
                {
                    founded=="Y" && 
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <PhoneCall strokeWidth={1} size={25} />
                        <span>Téléphone : {profil?.telephone}</span>
                    </div>
                    <div className="flex gap-3">
                        <HomeIcon strokeWidth={1} size={25} />
                        <span>Adresse : {profil?.adresse}</span>
                    </div>
                    <div className="flex gap-3">
                        <Mail strokeWidth={1} size={25} />
                        <span>Ville : {profil?.ville} / commune : {profil?.commune}</span>
                    </div>
                </div>
                }
            </div>
            {founded =="Y" &&
            <div className="mt-3 min-h-20 bg-red-400 px-10 flex flex-col gap-4 pt-7 pb-4">
                <p className="text-center text-white">
                   Ce profil a <span className="font-bold">{articles?.length} produits ou services à découvrir</span>
                </p>
                
            </div>
            }
            <div className="mt-3 min-h-28 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                {
                    founded=="Y" &&
                <p className="text-center">
                    Pour voir tous mes produits, services et demandes de disponibilité, veuillez télécharger notre application <span className="text-green-500 font-bold">pour gagner de l'argent  à chaque scan</span>

                </p>
                }
                <Btn  bg={"bg-blue-600"}  text={<div className="flex gap-3"><Download /> Télecharger application</div>} />
            </div>

        </div>
        // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        //     <Image
        //       className="dark:invert"
        //       src="/next.svg"
        //       alt="Next.js logo"
        //       width={180}
        //       height={38}
        //       priority
        //     />
        //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        //       <li className="mb-2">
        //         Get started by editing{" "}
        //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
        //           src/app/page.js
        //         </code>
        //         .
        //       </li>
        //       <li>Save and see your changes instantly.</li>
        //     </ol>

        //     <div className="flex gap-4 items-center flex-col sm:flex-row">
        //       <a
        //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         <Image
        //           className="dark:invert"
        //           src="/vercel.svg"
        //           alt="Vercel logomark"
        //           width={20}
        //           height={20}
        //         />
        //         Deploy now
        //       </a>
        //       <a
        //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         Read our docs
        //       </a>
        //     </div>
        //   </main>
        //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        //     <a
        //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       <Image
        //         aria-hidden
        //         src="/file.svg"
        //         alt="File icon"
        //         width={16}
        //         height={16}
        //       />
        //       Learn
        //     </a>
        //     <a
        //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       <Image
        //         aria-hidden
        //         src="/window.svg"
        //         alt="Window icon"
        //         width={16}
        //         height={16}
        //       />
        //       Examples
        //     </a>
        //     <a
        //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       <Image
        //         aria-hidden
        //         src="/globe.svg"
        //         alt="Globe icon"
        //         width={16}
        //         height={16}
        //       />
        //       Go to nextjs.org →
        //     </a>
        //   </footer>
        // </div>
    );
}

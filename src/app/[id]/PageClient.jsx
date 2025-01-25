"use client"
import { API, BACKEND, Btn, getData } from "@/utils/global";
import { Activity, Building, Download, Facebook, FacebookIcon, HomeIcon, Link, LucideActivity, Mail, MapPin, PhoneCall, Pin, User2, User2Icon, UserCircle, Youtube } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lien from "next/link";


export default function PageClient({ pa }) {
    const [profil, setProfil] = useState({})
    const [feedBack, setFeedBack] = useState("")
    const [articles, setArticles] = useState([])
    const [founded, setFounded] = useState("P");

    const id = pa;

    const logowhatspp = "data:image/jpeg;base64,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";
    const logoFacebook = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU7V53///8gRZUyUZrn6vKKl785VZxAW6Dh5O5yg7QmSZbR1uUxUJojR5Y2U5vx8vdbcKqyutSXosVidq3a3urM0uPCyd6ps9B7i7n09vrx9Pm4wNikrs1MZKRYbqp/j7tqfbGapsiPnMIAMY0VP5JdM9iBAAAD+UlEQVR4nO3dbVOjMBSG4fDSUEISXtRatta67v7/37hF7eiMs5iKyTmHee4Zx08i13RIhACq7K1mqCu1lqp6aC4w9fqtr5z1mnrHfiztrav6D8K2M+vRXdKmay/CsiiodydKRVG+ClvrqfclUt62L8JunZ/gVNFNwt5Q70fETH8WVusbZN7TVaYaR70XUXONGiz1TkTNDqpe60D6mq/Vqg/D6UCk3gOEEEIIIYQQQgghhMjz1hr3ofz8ZZwxxlpbFFr2NUJ9tvmbzf2u2ZbjmGXZOI6/2rLc3jZ3u0P/MGz2N0dtnZPJ9NYdN7sy+7p2q+QRtc0f70N0b0vY0tLGDuE8eUJtdH8NT5zQ2vsrfbKEOj+NVwMlCQvffO2RLDRP3/EJEubD94BihPm1Q6g0Yb77LlCIcAFQhtBdPwvKEprNAqAEoX9cAhQg1KZdudB9e54QIvTdMiB/Yb5dubA4LQSyF7qrzucFCpd/hNyFi49C7kK9dCBlLzSH1QuXA3kLi/3ahWbBaaEMoVv2Nzd/4cLTJgFC+3ydpd3eNp+65bz2dMVhOB5ORzstjX6OMVC50D9otntnJK74ahsIHHKhDw/qYxjwRuyzg0UdBKzlPncWNpQeBD86GLYaKvQQfCnoxOIg9iA8Z+4ChE+Sn410IUu+Vt4s+F7IhL8VPM6ECXeSD0OVB1xIvJc7Gaow4e/VC59XL9xInvAhhFBAEELIPwgh5B+EEPIPQgj5ByGE/INQhlD/vzChndnCy1aoq2YyIUI9t4UpWqMPW+VdUkl72T9wHXtJd6sX9rQXxRMIid+fm0C4p51OEggfaVfBEwiJl/njC0fiVfD4Qup1/vhC6nX++ELqdf74QupV8PhC6lum4guPxKdP8YXUd3lHF7bUN4VFF96uXkg9HcYXPlDfMhVdSH4pLrrwhvoO4uhC8v+uEls4Ug800YUl9WQRXdis/jOkfxgjtpD+HunYwj31ZBFd2FFPFtGF1L7oQvrpMLaQ+lJifCHxytqUfyq3MwUg5n6+JD93mohupj8Bq9ynvzMbYACcbx33YswFIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPmXUEj01rNUQl2pmuZlRKmEvlZE76ZPJbSDamjeZJNK6BpF9PrBREJdZSrrSV7Wk0ho+rMw6yimnTTCossmYWsJhtMkQm/bF2FW2vSfYgphYadfMgmztkv+auz4Qm26NrsIs6yvnPUplXGF2ltX9a9bUZfNNUNd/SThi+IKq3poLlv5B3kiS8fmdy97AAAAAElFTkSuQmCC"
    const logoYoutube = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9CWTwa_XKxleI3RkuyeJyuiHGU1vfM0hJRNotM2eatw1q_QiAbCPt2qmQR4ajWzZ2DU&usqp=CAU"
    const logoTikTok = "data:image/png;base64,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"

    const fulaye = "https://fulaye.com/img/hers.png"
    useEffect(() => {
        console.log(id);

        setFeedBack(<div className="flex items-center justify-center text-2xl">Traitement en cours...</div>)
        getData("profilHashed&idProfil=" + id).then((r) => {
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
        getData("articles&profil=" + pa?.id).then(r => {
            setArticles(r?.data)
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="text-center border-b-4 border-green-400  w-full text-2xl h-56 to-green-800 via-green-400 from-white bg-gradient-to-r">
                <p className="text-white text-4xl h-full" style={{ backgroundImage: `url(${fulaye})`, backgroundSize: "100%" }}>

                </p>

            </div>

            <div className="flex ">
                {/* <div className="-mt-160 border-1 shadow-md h-44 w-44 lg:w-60 lg:h-60 bg-white ml-14 sm:w-28 sm:h-28 md:h-28 md:w-28 rounded-full"> */}
                <img src={BACKEND + "imagesProfil/" + profil?.photo || "./profil.png"} className=" rounded-full -mt-40 shadow-md w-40 h-40 ml-8 border-2 border-green-500" />
                {/* </div> */}
            </div>
            <div className="-mt-[110px] pt-32  w-full pl-3 bg-white pb-8">
                {founded == "Y" &&
                    <>
                        <div className="font-bold text-2xl pl-5 mt-3 flex items-center gap-2"><UserCircle size={20} strokeWidth={1} /> {profil?.profilNom}</div>
                        <div className="pl-5 mt-2 flex items-center gap-2"><LucideActivity size={20} strokeWidth={1} />{profil?.profilTypeActivite}</div>
                        <div className="pl-5 mt-2">{profil?.bio}</div>
                    </>
                }
                <div className="flex justify-center gap-4 mt-4">

                    {founded == "Y" &&
                        <Btn text={
                            <div className="flex gap-2 items-center justify-center">
                                <img src={logowhatspp} className="w-6 h-6 rounded-md" /> WhatsApps
                            </div>}
                            bg={"bg-green-500"}
                            href={profil?.whatsapp ? `https://wa.me/${profil?.whatsapp}` : "#" + profil?.whatsapp}
                            width={300}
                        />}

                </div>
                {feedBack}
            </div>
            <div className="mt-3 min-h-28 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                <div className="font-bold">Bio</div>
                {
                    founded == "Y" &&
                    <div className="flex flex-col gap-4">
                        <div className="flex ">

                            {profil?.bio}
                        </div>

                    </div>
                }
            </div>
            <div className="mt-3 min-h-28 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                <div className="font-bold">Détail</div>
                {
                    founded == "Y" &&
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-3">
                            <PhoneCall strokeWidth={1} size={25} />
                            <span>Téléphone : {profil?.telephone}</span>
                        </div>
                        <div className="flex gap-3">
                            <MapPin strokeWidth={1} size={25} />
                            <span>Adresse : {profil?.adresse}</span>
                        </div>
                        <div className="flex gap-3">
                            <Building strokeWidth={1} size={25} />
                            <span>Ville : {profil?.ville} / commune : {profil?.commune}</span>
                        </div>
                    </div>
                }
            </div>

            {founded == "Y" &&
                <>
                    <div className="mt-3 min-h-20 bg-red-400 px-10 flex flex-col gap-4 pt-7 pb-4">
                        <p className="text-center text-white">
                            Ce profil a <span className="font-bold">{articles?.length} produits ou services à découvrir</span>
                        </p>

                    </div>
                    {(profil?.titreLien !== null && profil?.titreLien !== undefined) &&
                        <>
                            <Lien href={`${profil?.detailLien}`} target="_blank">
                                <div className="pt-3 min-h-10  flex flex-col gap-4 pb-4 px-3">
                                    <div style={{ borderRadius: 8, backgroundColor: "green", paddingHorizontal: 8, paddingVertical: 4, alignItems: "center", flexDirection: "column" }}>
                                        <div className='text-white py-2 flex justify-center items-center' style={{ paddingHorizontal: 5, paddingVertical: 6, display: "flex", gap: 2 }}>
                                            <div className=' pr-4'>
                                                <Link color={"white"} size={20} />
                                            </div>
                                            <div style={{}}>{profil?.titreLien}</div>
                                        </div>
                                    </div>

                                </div>
                            </Lien>
                        </>}
                    <div className="mt-1 min-h-20 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                        <div className="bg-white  mt-2 flex py-2 flex-col">
                            <span className="text-center text-lg">Rejoignez mon profil sur les réseaux sociaux</span>
                            <div className="flex flex-row gap-8 justify-center mt-2 mb-10">
                                <div className="flex flex-col items-center justify-center">
                                    <Lien href={`${profil?.facebook ?"https://facebook.com/" + profil?.facebook:"#"}`}
                                        className=" w-14 h-14 justify-center items-center bg-[#34D399] flex rounded-full"
                                    >
                                       <Image width={20} height={20} src={"/icons/facebook.svg"} color="white" />
                                    </Lien>
                                    <span>Facebook</span>
                                </div>
                              <div className="flex flex-col items-center justify-center">
                                    <Lien
                                       href={`${profil?.youtube ?"https://youtube.com/" + profil?.youtube:"#"}`}
                                        className=" w-14 h-14 justify-center items-center bg-[#34D399] rounded-full flex"
                                    >

                                        <Image width={20} height={20} src={"/icons/youtube.svg"} color="white" />
                                    </Lien>
                                    <span>Youtube</span>
                                </div>
                                 <div className="flex flex-col items-center justify-center">
                                    <Lien
                                       href={`${profil?.tiktok ?"https://tiktok.com/" + profil?.tiktok:"#"}`}
                                        className=" w-14 h-14 justify-center items-center bg-[#34D399] rounded-full flex">

                                            <Image width={20} height={20} src={"/icons/tiktok.svg"} color="white" />
                                    </Lien>
                                    <span>TikTok</span>
                                </div>
                                 <div className="flex flex-col items-center justify-center">
                                    <Lien 
                                         href={`${profil?.telegram ?"https://telegram.com/" + profil?.telegram:"#"}`}
                                        className=" w-14 h-14 justify-center items-center bg-[#34D399] rounded-full flex">
                                        <Image width={40} height={40} src={"/icons/telegram.svg"} color="white" />
                                    </Lien>
                                    <span>Telegram</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }


            <div className="mt-3 min-h-28 bg-white px-10 flex flex-col gap-4 pt-7 pb-4">
                {
                    founded == "Y" &&
                    <p className="text-center">
                        Pour voir tous mes produits, services et demandes de disponibilité, veuillez télécharger notre application <span className="text-green-500 font-bold">pour gagner de l'argent  à chaque scan</span>

                    </p>
                }
                <Btn bg={"bg-blue-600"} text={<div className="flex gap-3"><Download /> Télecharger application</div>} />
            </div>

        </div>
    );
}

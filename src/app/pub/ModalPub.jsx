
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { BACKEND as BACKEND_URL } from '@/utils/global';
import { Button, Modal } from 'antd';
import Link from 'next/link';
import Image from 'next/image';



const ModalPub = ({ id }) => {
    const [visible, setVisible] = React.useState(false);
    const [dataPub, setDataPub] = useState([]);
    // const [seconde,setSeconde]=useState(6);
    const [secondes, setSecondes] = useState(3);
    const [publicite, setPublicite] = useState("")
    const [stateOfPub, setStateOfPub] = useState("prestart");
    const [pubData, setPubData] = useState({});

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 40, };

    let minuteur = 3;
    const _minuteur = () => {
        setSecondes(minuteur)
        if (minuteur > 0) {
            setStateOfPub("start");
            minuteur -= 1;
            // setSecondes('Seconde ' + minuteur)
        } else {
            setVisible(false);
            setStateOfPub("end");
        }

    }
    const startPub = () => {
        setInterval(() => {
            _minuteur()
        }, 1500);
    }

    // const insertionIntoTabPub = async (idPub) => {
    //     const db2 = await SQLite.openDatabaseAsync("fulaye.db")
    //         (await db2).runAsync("INSERT INTO pubVus (idPub,dtVu) values (?,?)", 6, moment().format("DD/MM/YYYY HH:mm:SS"))
    // }

    const pubDatas = async () => {


        // await db.runAsync("INSERT INTO pubVus (idPub,dtVu) values (?,?)", [1,moment().format("DD/MM/YYYY HH:mm:SS")])

        // let currentId = 0

        // if (req2[0]) {
        //     currentId = req2[0]["idPub"];
        // } else {

        // }
        let id;
        console.clear();

        if (!localStorage.getItem("lastPubId")) {
            localStorage.setItem("lastPubId", 0)
            id = 0;
        } else {
            id = localStorage.getItem("lastPubId")
        }
        fetch(BACKEND_URL + `api.php?qry=lastIdPub&user=null&idcurrentPub=${id}`).then(r => r.json()).then(r => {
            if (r.success) {
                
                if (r?.id !== null) {
                    setVisible(r?.id!==id);
                    setPublicite(r?.fichier)
                    startPub();
                    setPubData(r)
                    if(r?.id!==null)
                    {  
                        localStorage.setItem("lastPubId", r?.id)
                    }
                }else{
                    
                    setVisible(false);
                }
            } else {

            }
        })





        // const enreg=_db.getAllAsync("select * from pubVus order by id desc");
        // console.log(enreg);
    }
    useEffect(() => {
        // Alert.alert("gsdgs")
        pubDatas()
    }, [])

    useEffect(() => {
        let lastLocalIdPub = null;
    }, [])
    return (
        // <SafeAreadiv style={{ flex: 1, backgroundColor: '#fff' }}>
        <div style={styles.container}>
            <div style={styles.header}>

                <Modal height={"100vh"} width={"100vw"} footer={false} closable={false} style={{ marginHorizontal: 10, top: 0, maxHeight: "100vh", height: "100vh" }} open={visible} contentContainerStyle={containerStyle}>
                    <div style={{ height: "100vh" }}>

                        <p style={{
                            pAlign: 'center',
                            marginTop: 5,
                            color: '#505050',
                        }}>Publicité</p>

                        <p style={{ pAlign: "center" }}>Regarder la pub vous fait gagner des points !</p>
                        <img
                            style={{ width: "100%", marginTop: 5, objectFit: "fill" }}
                            src={BACKEND_URL + "publicite/" + publicite}
                        // src={"https://images.unsplash.com/photo-1597348989645-46b190ce4918?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D"} 
                        />
                        <p style={{ fontSize: 22, fontWeight: '200', marginTop: 10, }}>{pubData?.titre}</p>
                        <p style={{ fontSize: 15, fontWeight: '100', marginTop: 5, }}>{pubData?.description}</p>
                        <div className=" items-center justify-center">
                            <Link href={`${pubData?.lien}`}> 
                            <Button style={{
                                width: 150,
                                height: 45,
                                borderRadius: 10,
                                backgroundColor: '#facc15',
                            }}
                            >
                               En savoir plus
                                </Button>
                            </Link>
                        </div>
                        



                    </div>

                </Modal>

            </div>
        </div>
        // </SafeAreadiv>
    )
}

export default ModalPub

const styles = {


    container: {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 0,
        borderColor: '#e3e3e3',
    },
};



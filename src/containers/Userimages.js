import { useState, useEffect } from 'react';
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator';
import Image from 'react-graceful-image';



function Userimages({ userid }) {

    const [isLoadingimages, setIsLoadingimages] = useState(true)
    const [imagedata, updateImagedata] = useState([])


    useEffect(() => {

        axios({
            method: 'GET',
            url: `https://insta.nextacademy.com/api/v2/images?userId=${userid}`,
        })
            .then((resp) => {

                setIsLoadingimages(false);

                if (resp.data.length > 0) {
                    const copyimagedata = resp.data;
                    updateImagedata(copyimagedata);
                }
                else {
                    setIsLoadingimages(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (isLoadingimages) {
        return <LoadingIndicator width="100px" height="100px" color="gray" />
    }
    // else {

    // }

    return (
        <div>
            {imagedata.map((data) => {

                    return (
                        <Image className="homepageuserimages" src={data.url} />
                    )
                }).reverse()}
        </div>
    )
}

export default Userimages;


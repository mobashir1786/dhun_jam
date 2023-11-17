import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chart = () => {

    let custom = 400;
    const [quantityName, setQuantityName] = useState([]);
    const [quantityValue, setQuantityValue] = useState([]);
    useEffect(() => {
        axios.get("https://stg.dhunjam.in/account/admin/4")
            .then((res) => {
                // setChartdata(res.data.data);
                setQuantityName(Object.keys(res.data.data.amount));
                setQuantityValue(Object.values(res.data.data.amount));
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);
    // console.log(quantityName, quantityValue);

    const handleSongRequest = (event) => {
        event.preventDefault();
        const custombar = event.target[2].value;
        const category_6 = event.target[3].value;
        const category_7 = event.target[4].value;
        const category_8 = event.target[5].value;
        const category_9 = event.target[6].value;
        const category_10 = event.target[7].value;
        // console.log(custombar, category_6, category_7, category_8, category_9, category_10);
        axios.put("https://stg.dhunjam.in/account/admin/4", { amount: { category_6, category_7, category_8, category_9, category_10 } })
            .then(res => {
                // console.log(res)
                if (res) {
                    window.location.href = 'https://dhun-jam.vercel.app/'
                } else {
                    alert(res.data.response);
                }
            }).catch(e => {
                console.log(e);
            })
    }
    const [fields, setFields] = useState(false)
    const handleRadioBtn = (e) => {
        console.log(e.target.value)
        if (e.target.value) {
            setFields(!fields)
        }
    }
    return (
        <div className='chart'>
            <form className="chartform" onSubmit={handleSongRequest}>
                <div className="chartHeading">Social, Hebbal on Dhun Jam</div>
                <div className="same">
                    <div>Do you want to charge your customers for requesting songs?</div>
                    <div className='requestingSong'>
                        <input type="radio" name='requestingSong' value={true} onChange={handleRadioBtn} />
                        <label>Yes</label>
                        <input type="radio" name='requestingSong' value={false} onChange={handleRadioBtn} />
                        <label>No</label>
                    </div>
                </div>
                <div className="same">
                    <div>Custom song request amount:</div>
                    {fields ? <input type="number" className='customSong' placeholder={`${custom} or less`} /> : <input type="number" className='customSong' placeholder={`it should be lessthan ${custom}`} disabled />}
                </div>
                <div className="same">
                    <div><div>Regular song request amounts,</div> <div>from high to low-</div></div>
                    <div className='requestAmount'>
                        {quantityValue.map((n) => (fields ? <input type="number" placeholder={n} key={n} /> : <input type="number" placeholder={n} key={n} disabled />))}
                    </div>
                </div>

                <div className="chartGraph">
                    <div className="bar" style={{ width: "50px", height: "100%", backgroundColor: "#F0C3F1", marginLeft: "5px" }}></div>
                    {
                        quantityValue.map((n) => (<div className="bar" style={{ width: "40px", height: `${n}px`, backgroundColor: "#F0C3F1", marginLeft: "5px" }} key={n}></div>))
                    }
                </div>
                <div className="name">
                    <div>Custom</div>
                    {
                        quantityName.map((n) => (<div>{n}</div>))
                    }
                </div>
                <button type='submit' className='loginbtn'>Save</button>
            </form>
        </div>
    )
}

export default Chart

import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReturnCard from '@/pages/SellerDashboard/dashboard/components/reviews/reuseble seller/ReturnCard';


const data = [
    {
        type: 'Vegetable Gallery',
        who: 'Sold by Methsara',
        img: "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        dili: 'Deliverd',
        diliDate: 'Returned on 16 Dec 2023',
        iType: 'Leeks Stock-500kg',
        cof: 'Cost Of Product : Ru.100000.00',
        Button: 'Return Product'
    },
    {
        type: 'Vegetable Gallery',
        who: 'Sold by Kasun',
        img: "https://purepng.com/public/uploads/large/purepng.com-carrotscarrotvegetablesfreshdeliciousefoodhealthycarrots-481521740717jmglq.png",
        dili: 'Deliverd',
        diliDate: 'Returned on 16 Dec 2023',
        iType: 'Leeks Stock-500kg',
        cof: 'Cost Of Product : Ru.100000.00',
        Button: 'Return Product'
    },
    {
        type: 'Vegetable Gallery',
        who: 'Sold by Kamal',
        img: "https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/pumpkin.jpg?itok=IXGgRg1X",
        dili: 'Deliverd',
        diliDate: 'Returned on 16 Dec 2023',
        iType: 'Leeks Stock-500kg',
        cof: 'Cost Of Product : Ru.100000.00',
        Button: 'Return Product'
    }


]

const ReturnCardM = () => {
    const navigate = useNavigate();
    return (

        <>
            <div className='bg-white rounded-lg px-8 py-2'>
                <h1 className='text-[#00000082]'> Select Product to Return and Refund </h1>
            </div>

            {data.map((item, index) => (
                <ReturnCard
                    key={index}
                    type={item.type}
                    who={item.who}
                    dili={item.dili}
                    diliDate={item.diliDate}
                    iType={item.iType}
                    cof={item.cof}
                    Button={item.Button}
                    img={item.img}
                />
            ))}
        </>

    )
}

export default ReturnCardM
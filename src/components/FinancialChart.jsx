import { useEffect, useState } from 'react';
import axios from '../services/api';

const FinancialChart = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
    //    axios.get('/api/finance-summary')
    //        .then(response => setData(response.data))
    //        .catch(error => console.error(error));
   }, []);

   return (
       <div className="bg-white p-4 shadow rounded">
           <h2 className="text-xl font-bold">Financial Overview</h2>
           <div>
               {data.map(item => (
                   <div key={item.id}>
                       <p>{item.label}: {item.value}</p>
                   </div>
               ))}
           </div>
       </div>
   );
};
export default FinancialChart;

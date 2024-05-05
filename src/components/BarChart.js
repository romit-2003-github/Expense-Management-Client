// BarChart.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartExample = ({ allTransactions }) => {

    const [transactionData, setTransactionData] = useState([]);

    const processTransactionData = (data) => {
        const monthlyData = {};

        data.forEach(transaction => {
            const date = new Date(transaction.date);
            const month = date.getMonth();

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    credit: 0,
                    debit: 0
                };
            }

            if (transaction.type === 'credit') {
                monthlyData[month].credit += transaction.amount;
            }
            else if (transaction.type === 'debit') {
                monthlyData[month].debit += transaction.amount;
            }
        });

        const processedData = Object.keys(monthlyData).map(month => ({
            month: parseInt(month) + 1,
            credit: monthlyData[month].credit,
            debit: monthlyData[month].debit
        }));

        processedData.sort((a, b) => a.month - b.month);
        console.log(processedData);
        setTransactionData(processedData);

        console.log(transactionData);
    };

    useEffect(() => {
        processTransactionData(allTransactions);
    }, [allTransactions]);

    //const transactionCount = allTransactions.length;


    return (
        <>
            <h2 className='text-3xl font-bold text-center my-10'>Bar Chart Representation </h2>
            <BarChart
                width={1000}
                height={400}
                data={transactionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="credit" fill="green" name='credit' />
                <Bar dataKey="debit" fill="red" name='debit' />
            </BarChart>
        </>
    );
};

export default BarChartExample;

import React from 'react'
import { Card, Flex, Progress } from 'antd';
import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import BarChartExample from './BarChart';
const Analytics = ({ allTransactions }) => {

    const categories = ['salary', 'tip', 'project', 'food', 'fun', 'bills', 'medical expenses', 'education', 'tax', 'other'];


    const totalTransactions = allTransactions.length;

    const totalCreditTransactions = allTransactions.filter(transaction => transaction.type === 'credit').length;

    const totaldebitTransactions = allTransactions.filter(transaction => transaction.type === 'debit').length;

    const totalCreditAmount = allTransactions.filter(transaction => transaction.type === 'credit').reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalDebitAmount = allTransactions.filter(transaction => transaction.type === 'debit').reduce((acc, transaction) => acc + transaction.amount, 0);

    const creditPercent = ((totalCreditAmount / (totalCreditAmount + totalDebitAmount)) * 100).toFixed(2);
    const debitPercent = ((totalDebitAmount / (totalCreditAmount + totalDebitAmount)) * 100).toFixed(2);
    return (
        <>
            <div className="analyticsCenter  sm:flex sm:flex-col md:flex">
                <h1 className='text-3xl font-bold'>Analytics</h1>
                <div className="cards">
                    <Card
                        title={`Total Transactions`}
                        bordered={true}
                        style={{
                            width: 300,
                            height: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <h2 className='text-2xl'>₹. {totalCreditAmount + totalDebitAmount}</h2>
                        </div>
                        <Progress className='mt-2' type="dashboard" percent={100} format={() => 'Total'} />
                    </Card>
                    <Card
                        title={`Total Credit Transactions`}
                        bordered={true}
                        style={{
                            width: 350,
                            height: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        <div className="d-flex justify-content-between align-center">
                            <h2 className='text-2xl text-green-600'>₹. {totalCreditAmount}</h2>
                            <RiseOutlined className='AnalyticIcon' />
                        </div>
                        <Progress className='mt-2' type="dashboard" percent={`${creditPercent}`} />
                    </Card>
                    <Card
                        title={`Total Debit Transactions`}
                        bordered={true}
                        style={{
                            width: 350,
                            height: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <h2 className='text-2xl text-red-600'>₹. {totalDebitAmount}</h2>
                            <FallOutlined className='AnalyticIcon' />
                        </div>
                        <Progress className='mt-2' type="dashboard" percent={`${debitPercent}`} />
                    </Card>
                </div>
                <div className="charts mt-4">
                    <BarChartExample allTransactions={allTransactions} />
                </div>
                <div className="categories">
                    <h4 className='text-3xl py-16 text-center font-bold'>Category Wise Income</h4>
                    <div className="incomeCat flex flex-wrap justify-start">
                        {
                            categories.map((category) => {
                                const totalAmount = allTransactions.filter(transaction => transaction.category === category && transaction.type === 'credit').reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    (totalAmount > 0) &&
                                    <div className="card w-[300px] m-6 p-6 rounded-lg">
                                        <div className="card-body">
                                            <h5 className='text-2xl mb-4'>{category}</h5>
                                            <Progress percent={((totalAmount / totalCreditAmount) * 100).toFixed(2)}></Progress>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h4 className='text-3xl py-16 text-center font-bold'>Category Wise Expenses</h4>
                    <div className="expenseCat flex flex-wrap justify-start">
                        {
                            categories.map((category) => {
                                const totalAmount = allTransactions.filter(transaction => transaction.category === category && transaction.type === 'debit').reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    (totalAmount > 0) &&
                                    <div className="card w-[300px] m-6 p-6 rounded-lg">
                                        <div className="card-body">
                                            <h5 className='text-2xl mb-4'>{category}</h5>
                                            <Progress percent={((totalAmount / totalDebitAmount) * 100).toFixed(2)}></Progress>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </>
    )
}

export default Analytics

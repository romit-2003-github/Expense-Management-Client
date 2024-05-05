import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout';
import { Modal, message, Form, Select, Input, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import Spinner from '../components/Spinner';
import axios from 'axios';
import moment from 'moment';
import Analytics from '../components/Analytics';

const { RangePicker } = DatePicker;

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');

  const handleModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('transactions/addTransaction', { ...values, userId: user._id });
      message.success('Transaction added successfully');
      setLoading(false);
      setShowModal(false);
    }
    catch (error) {
      setLoading(false);
      message.error('Failed to add transaction');
    }
  }

  // Edit Transactions
  const editTransactions = (record) => {
    console.log(record);
  }

  // Table Data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => <span className='font-bold'>{text}</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text) => <span className={`${text === 'debit' ? 'text-red-700' : 'text-green-700'}`}>{text}</span>
    },
    {
      title: 'Actions',
      width: 1,
      render: (text, record) => (
        <div className='flex justify-center'>
          <button className='btn bg-[#3CB29C] text-white mx-2' onClick={editTransactions(text)}><EditFilled/></button>
          <button className='btn btn-danger'><DeleteFilled/></button>
        </div>
      ) 
    }
  ]

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        setLoading(true);
        const res = await axios.post('transactions/getTransaction', {
          userId: user._id,
          frequency,
          selectedDate,
          type
        });
        setLoading(false);
        setAllTransactions(res.data.data);
        // console.log(res.data.data);
      }
      catch (error) {
        setLoading(false);
        message.error('Failed to fetch transactions');
      }
    }
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <div className="filters mx-20 my-10">
          <div>
            <h6 className='my-2'>Select Frequency</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value='7'>Last 1 week</Select.Option>
              <Select.Option value='30'>Last 1 month</Select.Option>
              <Select.Option value='365'>Last 1 year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
          </div>
          <div>
            <h6 className='my-2'>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value='all'>All Transactions</Select.Option>
              <Select.Option value='credit'>Credit</Select.Option>
              <Select.Option value='debit'>Debit</Select.Option>
            </Select>
          </div>
          <div className='switchIcons'>
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
          </div>
          <div>
            <button className='btn bg-[#3CB29C] text-white flex align-center px-2'onClick={handleModal}>ADD NEW <PlusOutlined/></button>
          </div>
        </div>

        <div className="content">
          {viewData === 'table' ?
            <Table className='p-20' columns={columns} dataSource={allTransactions} />
            : <Analytics allTransactions={allTransactions} />
          }
        </div>
        <Modal
          open={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          footer={false}>
          <h3>Add Transaction</h3>
          <Form layout='vertical' onFinish={handleSubmit} style={{ margin: "2rem 0 0 0" }}>
            <Form.Item label='Amount' name='amount'>
              <Input type='text' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label='Type' name='type'>
              <Select>
                <Select.Option value='credit'>Credit</Select.Option>
                <Select.Option value='debit'>Debit</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Category' name='category'>
              <Select>
                <Select.Option value='salary'>Salary</Select.Option>
                <Select.Option value='tip'>Tips</Select.Option>
                <Select.Option value='project'>Projects</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='fun'>Fun</Select.Option>
                <Select.Option value='bills'>Bills</Select.Option>
                <Select.Option value='medical expenses'>Medical Expenses</Select.Option>
                <Select.Option value='education'>Education Expenses</Select.Option>
                <Select.Option value='tax'>Tax Expenses</Select.Option>
                <Select.Option value='other'>Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Reference" name='reference'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label="Description" name='description'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label="Date" name='date'>
              <Input type='date' />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button className='btn btn-success' type='submit'>ADD</button>
              <button className='btn btn-primary mx-2' type='primary' onClick={() => setShowModal(false)} >Cancel</button>
            </div>
          </Form>
        </Modal>


      </Layout>
    </>
  )
}

export default HomePage

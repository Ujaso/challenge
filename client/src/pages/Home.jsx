import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import useAxiosPrivate from '../hooks/usePrivate'

export default function Home() {
    const { user } = useAuth()
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const getUser = useUser()
    const axiosPrivateInstance = useAxiosPrivate()

    useEffect(() => {
        getUser()
    }, [])

    async function getEthBalance() {
        try {
          setLoading(true)
          const { data } = await axiosPrivateInstance.get('auth/balance')
          setBalance(data)
          setLoading(false)
        } catch (error) {
          console.log('===', error.response)
        }
    }
    
    useEffect(() => {
        if (user?.id) getEthBalance()
    }, [user?.id])
    
    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 'List user Ethereum balance' : 'Please login first'}
                    </div>
                    {user?.email && !loading && <div>
                        <label>My balance :&nbsp;</label>
                        <span>{ balance } &nbsp; ETH</span>
                    </div>}
                    {loading && <div>Loading ...</div>}
                </div>
            </h2>
        </div>
    )
}

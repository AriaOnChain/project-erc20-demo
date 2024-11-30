
import { Contract} from '@ethersproject/contracts';
import ABI from '../../artifacts/contracts/GLD.sol/GLD.json';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
const tokenAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const a = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const b = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

/**
 * 1. a账户初始有10个代币
 * 2. a给b的账户转3个币
 * 
 * 3. 切换到A的账户，授权B账户可以从A的账户转3个代币
 * 4. 切换到B的账户上，从A里面转3个代币到B账户
 * 
 * 5. A有4个代币，B有6个代币
 */
export function useContract(){
    const {provider,connector,account} = useWeb3React();
    const [balance, setBalance] = useState(0);
 

    const approve = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.approve(b,1);
    }

    const transfer = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.transferFrom(a, b, 1);
    }

    const balanceOf = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const balance = await contract.balanceOf(a);
        setBalance(balance.toString());
        console.log("balance",balance.toString());
    }

    /**
     * 验证签名
     */
    const verify = async (messagesHash,sign,address)=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const sig = await contract.verifySignature(messagesHash,sign,address);
        console.log("sig",sig);
    }

    return {
        approve,
        transfer,
        balanceOf,
        balance,
        verify
    }
}


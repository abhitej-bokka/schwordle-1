import React, { FC, useEffect, useState } from 'react';
import { Message, Prisma, PrismaClient } from '@prisma/client'
import classNames from "classnames";
import { AiFillHeart } from "react-icons/ai";
import { BsChatSquareFill } from "react-icons/bs";
import styles from "../styles/components/Card.module.css";

interface UserProps {
  userPhone: string,
  createdAt: number,
  name?: string,
  groupCode: string,
  order: number,
  messages?: Message[]
}

const Card = ({ userPhone, createdAt, name, groupCode, order, messages }: UserProps) => {
    
    let todaysWordle = "287"
    let cardMessage = messages?.find((x) => {
        if(x.messageString.split(" ")[1] == todaysWordle) return x
    })

    if(!(typeof cardMessage === 'undefined' || cardMessage === null)){
        let blockArray = cardMessage?.messageString.split("\n").filter((string,  index) => {
            if(index >= 2) return string
        })
    
        return (
    
        <div className={classNames([styles.wrapper, styles.wrapperAnime])}>
          <div className={styles.header}>
            <div className="pt-2 relative w-full h-44">
            {}
            {blockArray.map((string) => <div className=" text-5xl">{string}</div>)}
            </div>
          </div>
          <div className={styles.textWrapper}>
            <h1 className={styles.text}>{`${userPhone}, Wordle #${todaysWordle}`}</h1>
          </div>
        </div>
        );
    }

    return <></>
    
};

export default Card
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Prisma, PrismaClient } from '@prisma/client'
import { userInfo } from "os";
import Card from "../components/Card"
import styles from "../styles/components/Group.module.css";

const prisma = new PrismaClient()

const Details = ({ userWithMessages }) => {
    const router = useRouter()
    
    // useEffect(() => {
    //     users.map(x => {
            
    //     });
    // }, [props.router])

    return (
        <div>
            <div className="bg-gray-100 w-full text-center pt-6 text-4xl">{router.query.data}</div>
            <main className={styles.section}>
                <section className={styles.container}>
                    <div className={styles.layout}>
                        {userWithMessages.map((x, index) => <Card userPhone={x.userPhone} createdAt={x.createdAt} name={x.name} groupCode={x.groupCode} order={index + 1} messages={x.messages} />)}
                    </div>
                </section>
            </main>
        </div>
        
    )
}


export async function getServerSideProps(ctx) {

    
    let users = await prisma.user.findMany({
        where: {
            groupCode: ctx.params.group, 
        }
    })
    
    users = await users.map(x => {
        x.createdAt = Math.floor(x.createdAt / 1000)
        return x
    })

    let userWithMessages = await Promise.all(users.map( async (x) => {
        let messages = await prisma.message.findMany({
            where: {
                userPhone: x.userPhone, 
            }
        })

        x.messages = messages
        return x;
    }))

    return {
      props: { userWithMessages }
    }
}

export default Details
